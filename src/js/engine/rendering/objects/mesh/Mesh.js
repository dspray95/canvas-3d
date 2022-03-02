import Triangle from "../primitives/Triangle";
import WorldObject from "../../../objects/WorldObject"
import { Vector } from "../primitives/Vector"
import { MeshDefaults } from "./MeshDefaults";
import Point, { averagePoint } from "../primitives/Point";
import { Color } from "../../../../tools/Colors"
import { randomRange } from "../../../../tools/Random";
import { FlatShading } from "../../shader/FlatShading";

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
              shader=FlatShading,
              color=MeshDefaults.planeColor
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
    this.wireframeColor = MeshDefaults.wireframeColor
    
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

  translate(vector){
    this.points.forEach((point) => {
      point.add(vector)
    })
  }

  scale(x, y, z){

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
        let triangle = new Triangle(this.points[triangleArray[0]],
                                    this.points[triangleArray[1]],
                                    this.points[triangleArray[2]],
                                    this.color)
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

  draw(canvas, camera, opacity=1){

    if(!this.doDrawCall){
      return
    }

    // let newPoints = []
    // for(let i = 0; i < this.points.length; i++){
    //   camera.perspectivePointProjectionPipeline(this.points[i])
    //   if(this.points[i].inPerspectiveSpace.w > 0){
    //     newPoints.push(this.points[i])
    //   }
    // }
    // this.points = newPoints
    // this.points.forEach(point => {
    //   camera.perspectivePointProjectionPipeline(point);
    // })

    // this.sortTrianglesByDepth()
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
    // this.triangles.forEach(triangle => {

    //   let faceCull = triangle.normal.dotProduct(triangle.calculatePlaneCenter().getVectorTo(camera.location)) <= 0 ? true : false
    //   if(!faceCull){
        
    //     let clipResultsAB = camera.clipLine(triangle.A.inPerspectiveSpace, triangle.B.inPerspectiveSpace)
    //     let clipResultsBC = camera.clipLine(triangle.B.inPerspectiveSpace, triangle.C.inPerspectiveSpace)

    //     canvas.beginPath()
    //     if(clipResultsAB.showLine){
    //       canvas.moveTo(triangle.A.screenSpaceX, triangle.A.screenSpaceY)
    //       canvas.lineTo(triangle.B.screenSpaceX, triangle.B.screenSpaceY)
    //     }
    //     else{
    //       canvas.moveTo(triangle.B.screenSpaceX, triangle.B.screenSpaceY)
    //     }
    //     if(clipResultsBC.showLine){
    //       canvas.lineTo(triangle.C.screenSpaceX, triangle.C.screenSpaceY)
    //     }
    //     canvas.closePath()
        
    //     //Color!
    //     // for B val 
    //     // bLit = b(ambient.b + diffuse.b * (n dot l)) + lightSource.b * specular.b(n dot c)^m
    //     // Where 
    //     //  n = plane normal vector
    //     //  l = vector from plane centre point and light source location
    //     //  c = vector from plane centre point to camera location
    //     //  m = falloff for specularity (constant)
    //     if(clipResultsAB.showLine || clipResultsBC.showLine){
    //       if (this.drawFaces){
    //         let lightSource = this.parent.parent.lightSources[0]
    //         let diffuse = 0.1
    //         let specularity = 0.01
    //         let planeToLightSourceVector = triangle.planeCentre.getVectorTo(lightSource.location).unitLengthVector()
    //         let planeToCameraVector = triangle.planeCentre.getVectorTo(this.parent.parent.camera.location).unitLengthVector()
            
    //         let rLit = triangle.color.R * (MeshDefaults.globalIllumination + diffuse * triangle.normal.dotProduct(planeToLightSourceVector)) + lightSource.color.R * (specularity * planeToLightSourceVector.dotProduct(planeToCameraVector))
    //         let gLit = triangle.color.G * (MeshDefaults.globalIllumination + diffuse * triangle.normal.dotProduct(planeToLightSourceVector)) + lightSource.color.G * (specularity * planeToLightSourceVector.dotProduct(planeToCameraVector))
    //         let bLit = triangle.color.B * (MeshDefaults.globalIllumination + diffuse * triangle.normal.dotProduct(planeToLightSourceVector)) + lightSource.color.B * (specularity * planeToLightSourceVector.dotProduct(planeToCameraVector))
    //         let colorLit = new Color(rLit, gLit, bLit, 1).toHtmlRgba()
    //         canvas.fillStyle = colorLit
    //         canvas.fill()
    //         canvas.strokeStyle = colorLit
    //         canvas.lineWidth = 1;
    //         canvas.stroke()
    //       }
    //       if(this.drawWireframe){
    //         canvas.strokeStyle = Color.PINK.toHtmlRgba();
    //         canvas.lineWidth = 1;
    //         canvas.stroke()
    //       }
    //     }
    //   }
    // })

    // These calls aren't inside the triangle loop above, since we wan them to always be drawn on top,
    // and painters algorithm is limited
    if (this.drawVertices){
      // console.log(`draw points len ${this.points.length}`)
      let idxHigh = 0
      this.points.forEach(point => {
        canvas.fillStyle = this.verticeColor.toHtmlRgba()
        canvas.fillRect(point.screenSpaceX - 2, point.screenSpaceY - 2, 4, 4);
        
        if(MeshDefaults.drawVerticeNumbers){
          let idx = this.points.indexOf(point)
          
          canvas.fillStyle = Color.WHITE.toHtmlRgba();
          canvas.font = "20px monospace"
          canvas.fillText(`${idx}`, point.screenSpaceX, point.screenSpaceY);
          idxHigh = idx
        }

      })
      if(this.done === false){
        console.log(`points draw idx ${idxHigh}`)
        this.done = true
      }
    }

    // if(this.drawWireframe){
    //   canvas.strokeStyle = Color.PINK.toHtmlRgba()
    //   canvas.lineWidth = 1;

    //   this.triangles.forEach(triangle => {
    //     canvas.beginPath()
    //     canvas.moveTo(triangle.A.screenSpaceX, triangle.A.screenSpaceY)
    //     canvas.lineTo(triangle.B.screenSpaceX, triangle.B.screenSpaceY)
    //     canvas.lineTo(triangle.C.screenSpaceX, triangle.C.screenSpaceY)
    //     canvas.lineTo(triangle.A.screenSpaceX, triangle.A.screenSpaceY)
    //     canvas.closePath()
    //     canvas.stroke();

    //   })
    // }

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



