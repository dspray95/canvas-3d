import Triangle from "../primitives/Triangle";
import WorldObject from "../../../objects/WorldObject"
import { Vector } from "../primitives/Vector"
import { MeshDefaults } from "./MeshDefaults";
import { averagePoint } from "../primitives/Point";
import { FlatShader } from "../../shader/FlatShader";

class Mesh{

  /**
   * @param {WorldObject} parent 
   * @param {Camera} camera
   * @param {MeshData} meshData
   */

  constructor(
    parent,
    camera, 
    meshData,
    {
      doDrawCall=true, 
      shader=FlatShader,
      color=MeshDefaults.planeColor,
    }
  ){
    this.parent = parent
    this.vertices = meshData.vertices
    this.shader = shader
    this.color = color
    this.movePointsToLocation(parent)
    this.triangles = this.makeTriangles(meshData.triangles, camera)

    this.doDrawCall = doDrawCall 
    this.drawCalls = 0
  }

  setMeshData(meshData){
    this.triangles = this.makeTriangles(meshData.triangles)
  }

  rotate(axis, angle, verticesOnly=false){
    this.vertices.forEach((vertex) => {
      vertex.subtract(new Vector(this.parent.location.x, this.parent.location.y, this.parent.location.z))
      vertex.rotate(axis, angle * (Math.PI / 180))
      vertex.add(new Vector(this.parent.location.x, this.parent.location.y, this.parent.location.z))
    })
    if(!verticesOnly){
      this.sortTrianglesByDepth()
      this.triangles.forEach(triangle => {
        triangle.normal.rotate(axis, angle)
        triangle.calculateNormal()
      })
    }
  }

  scale(x, y, z){
    this.vertices.forEach((vertex) => {
      vertex.subtract(new Vector(this.parent.location.x, this.parent.location.y, this.parent.location.z))
      vertex.scale(x, y, z)
      vertex.add(new Vector(this.parent.location.x, this.parent.location.y, this.parent.location.z))
    })
  }

  translate(vector){
    this.vertices.forEach((vertex) => {
      vertex.add(vector)
    })
  }

  movePointsToLocation(parent){
    this.vertices.forEach(vertex => {
      vertex.add(new Vector(parent.location.x, parent.location.y, parent.location.z))
    })
  }

  makeTriangles(trianlgesArray, camera){
    this.vertices.forEach(vertex => {
      camera.perspectivePointProjectionPipeline(vertex);
    })
    let triangleObjects = []
    trianlgesArray.forEach(triangleArray => {
      try{
        let triangle = new Triangle(
          this.vertices[triangleArray[0]],
          this.vertices[triangleArray[1]],
          this.vertices[triangleArray[2]],
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
  
  getVerticesFromTriangle(triangle){
    return [this.vertices[triangle[0]], 
            this.vertices[triangle[1]], 
            this.vertices[triangle[2]]]
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
    this.vertices.forEach( vertex => {
      if(vertex.x > 0 || vertex.x < 0 ){
        vertex.x = -vertex.x
      } 
    })

  }

  setOpacity(opacity){
    this.triangles.forEach(triangle => {
      triangle.setOpacity(opacity)
    })
  }

  draw(canvas, camera){
    if(!this.doDrawCall){
      return
    }

    this.shader.draw(
      camera, 
      canvas,
      this.triangles,
      this.drawCalls
    )
      
    this.drawCalls += 1
  }
}

export { Mesh }

