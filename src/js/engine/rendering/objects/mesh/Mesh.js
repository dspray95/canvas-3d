import Triangle from "../primitives/Triangle";
import WorldObject from "../../../objects/WorldObject"
import { Vector } from "../primitives/Vector"
import { MeshDefaults } from "./MeshDefaults";
import Point, { averagePoint } from "../primitives/Point";
import { Color } from "../../../../tools/Colors"
import { randomRange } from "../../../../tools/Random";
import { FlatShader } from "../../shader/FlatShader";
import { Logger } from "../../../logging/logger";

export default class Mesh{

  /**
   * @param {WorldObject} parent 
   * @param {Array} points 
   * @param {Array} triangles 
   */

  constructor(parent,
              camera, 
              points=[], 
              triangles=[], 
              doDrawCall=true, 
              drawVertices=false, 
              drawWireframe=false,
              shader=FlatShader,
              color=MeshDefaults.planeColor,
              wireframeColor=MeshDefaults.wireframeColor
              ){
    this.parent = parent
    this.points = points
    this.shader = shader
    this.color = color
    this.movePointsToLocation(parent)
    this.triangles = this.makeTriangles(triangles, camera)
    
    this.drawVertices = drawVertices
    this.drawWireframe = drawWireframe
    this.doDrawCall = doDrawCall 
    this.drawCalls = 0
    // Defautls for color values
    this.verticeColor = MeshDefaults.verticeColor
    this.faceCentrePointColor = MeshDefaults.faceCentrePointColor
    this.wireframeColor = wireframeColor
    
    this.drawFaces = true;
    this.done = false;
  }

  rotate(axis, angle, pointsOnly=false){
    this.points.forEach((point) => {
      point.subtract(new Vector(this.parent.location.x, this.parent.location.y, this.parent.location.z))
      point.rotate(axis, angle * (Math.PI / 180))
      point.add(new Vector(this.parent.location.x, this.parent.location.y, this.parent.location.z))
    })
    if(!pointsOnly){
      this.sortTrianglesByDepth()
      this.triangles.forEach(triangle => {
        triangle.normal.rotate(axis, angle)
        triangle.calculateNormal()
      })
    }
  }

  scale(x, y, z){
    this.points.forEach((point) => {
      point.subtract(new Vector(this.parent.location.x, this.parent.location.y, this.parent.location.z))
      point.scale(x, y, z)
      point.add(new Vector(this.parent.location.x, this.parent.location.y, this.parent.location.z))
    })
  }

  translate(vector){
    this.points.forEach((point) => {
      point.add(vector)
    })
  }



  movePointsToLocation(parent){
    this.points.forEach(point => {
      point.add(new Vector(parent.location.x, parent.location.y, parent.location.z))
    })
  }

  makeTriangles(trianlgesArray, camera){
    this.points.forEach(point => {
      camera.perspectivePointProjectionPipeline(point);
    })
    let triangleObjects = []
    trianlgesArray.forEach(triangleArray => {
      try{
        let triangle = new Triangle(
          this.points[triangleArray[0]],
          this.points[triangleArray[1]],
          this.points[triangleArray[2]],
          this.color
        )
        triangle.calculateNormal(this.parent.location)                        
        triangleObjects.push(triangle)
      } catch (e){
        console.log("triangle error D:")
        console.log(triangleArray)
      } 

    })
    return triangleObjects
  }
  
  getPointsFromTriangle(triangle){
    return [this.points[triangle[0]], 
            this.points[triangle[1]], 
            this.points[triangle[2]]]
  }

  sortTrianglesByDepth(){
    this.triangles.sort((a, b) => {

      let aAvgDistanceFromCamera = averagePoint(a.pointsAsList(), true).w
      let bAvgDistanceFromCamera = averagePoint(b.pointsAsList(), true).w

      if (aAvgDistanceFromCamera < bAvgDistanceFromCamera){
        return 1
      }
      else if (aAvgDistanceFromCamera == bAvgDistanceFromCamera){
        return 0
      }
      else {
        return -1
      }
    })
  }

  bakeLighting(lightSource, cameraLocation){
    /**
     *  Lighting!
     *  for blue channel: 
     *    bLit = b(ambient.b + diffuse.b * (n dot l)) + lightSource.b * specular.b(n dot c)^m
     *    Where 
     *     n = plane normal vector
     *     l = vector from plane centre point and light source location
     *     c = vector from plane centre point to camera location
     *     m = falloff for specularity (constant)
     *  repeat for green and red channels
     *  will need to do this for every triangle
     *  currently set up for a single light source
     */
    this.triangles.forEach(triangle => {
      let planeToLightSourceVector = triangle.planeCentre.getVectorTo(lightSource.location).unitLengthVector()
      let planeToCameraVector = triangle.planeCentre.getVectorTo(cameraLocation).unitLengthVector()
      

      triangle.setColor(
        FlatShader.CalculateLighting(
          triangle.color,
          triangle.normal,
          planeToCameraVector,
          planeToLightSourceVector,
        )
      )
    })
  }

  mirrorXAxis(){
    /** Will recreate the given mesh flipped over the x axis, so point (-1, 1, 1) will turn into (1, 1, 1)  
    */
    //TODO We've got to recreate the tris on the opposite side as well, could be a bit tricky
    this.points.forEach( point => {
      if(point.x > 0 || point.x < 0 ){
        point.x = -point.x
      } 
    })
  }

  draw(canvas, camera, opacity=1){

    if(!this.doDrawCall){
      return
    }

    this.shader.draw(
      camera, 
      canvas,
      this.triangles,
      this.parent.parent.lightSources,
      this.drawFaces, 
      this.drawWireframe,
      opacity,
      this.drawCalls,
      this.parent.width,
      this.parent.height
    )
      
    this.drawCalls += 1
   
    if(MeshDefaults.drawSurfaceNormals){
      canvas.lineWidth = 1;
      canvas.strokeStyle = Color.DEFAULTS.white.toHtmlRgba()
      this.triangles.forEach(triangle => {
        let faceCull = triangle.normal.dotProduct(triangle.planeCentre.getVectorTo(camera.location)) <= 0 ? true : false
        if(!faceCull){
          canvas.strokeStyle = Color.DEFAULTS.white.toHtmlRgba()
        }
        else{
          canvas.strokeStyle = Color.DEFAULTS.red.toHtmlRgba()
        }
        canvas.fillStyle = Color.DEFAULTS.white.toHtmlRgba()
        let screenSpaceCentre = averagePoint(triangle.pointsAsList())
        let normalEndPoint = screenSpaceCentre.copy()
        normalEndPoint.add(triangle.normal)
        
        camera.perspectivePointProjectionPipeline(normalEndPoint)
        canvas.beginPath()
        canvas.fillRect(screenSpaceCentre.screenSpaceX - 3, screenSpaceCentre.screenSpaceY - 3, 6, 6)
        canvas.moveTo(screenSpaceCentre.screenSpaceX, screenSpaceCentre.screenSpaceY)
        canvas.lineTo(normalEndPoint.screenSpaceX, normalEndPoint.screenSpaceY)
        canvas.closePath()
        canvas.stroke()

      })
    }
  }
}



