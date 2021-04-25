import { Color } from "../../tools/Colors";
import { Point, averageDimension, averagePoint } from "../rendering/objects/primitives/Point";
import { Worldspace } from "../Worldspace";

export default class WorldObject {
  constructor(location, parent, name="WorldObject") {
    this.location = location;
    this.parent = parent;
    this.points = [];
    this.perspectivePoints = [];
    // this.edges = [];
    this.edges = []
    this.faces = []
    this.scripts = []
    this.mesh = null
    this.done = false;
    this.verticeColor =  Color.YELLOW;
    this.lineColor = Color.BLUE;
    this.name = name
    this.logPerspectivePos = false;
    this.logged = false;
  }

  getWorldspace(){
    if(this.parent instanceof Worldspace){
      return this.parent
    } else {
      return this.parent.getWorldspace()
    }
  }

  drawOrtho(ctx) {
    ctx.fillStyle = Color.YELLOW.asHtmlRgba();
    this.points.forEach((point) => {
      point.orthographicSpace();
      ctx.fillRect(
        point.screenSpaceX + this.location.x,
        point.screenSpaceY + this.location.y,
        2,
        2
      );
    });
  }

  sortFacesByDepth(){
    this.faces.sort((a, b) => {
      let aPoints = this.getPointsFromFace(a)
      let bPoints = this.getPointsFromFace(b)


      let aAvgDistanceFromCamera = averagePoint(aPoints, true).w
      let bAvgDistanceFromCamera = averagePoint(bPoints, true).w

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

  getPointsFromEdge(edge){
    return [this.points[edge.startPoint], this.points[edge.endPoint]]
  }

  getPointsFromFace(face){
    return [this.points[face[0]], 
            this.points[face[1]], 
            this.points[face[2]], 
            this.points[face[3]]]
  }

  drawPerspective(ctx, camera) {
    this.mesh.draw(ctx, camera)
    // ctx.fillStyle = this.verticeColor.toHtmlRgba();
    // ctx.strokeStyle = this.lineColor.toHtmlRgba();

    // this.edges.forEach((edge) => {
    //   let edgePoints = this.getPointsFromEdge(edge)
    //   let startPoint = edgePoints[0]
    //   let endPoint = edgePoints[1]

    //   camera.perspectivePointProjectionPipeline(startPoint)
    //   camera.perspectivePointProjectionPipeline(endPoint)

    //   //Do clipping
    //   let clipResults = camera.clipLine(startPoint, endPoint)
    //   if (!this.done){
      
    //   }
    //   if (clipResults.showLine && clipResults.intersectVector !== null){
    //     if(startPoint.w > endPoint.w){
    //       endPoint = clipResults.intersectVector
    //     }
    //     else(
    //       startPoint = clipResults.intersectVector
    //     )
    //   }
    //   // else if (!clipResults.showLine){
    //   //   return
    //   // }

    //   //Draw wireframe
    //   ctx.beginPath()
    //   ctx.moveTo(startPoint.screenSpaceX, startPoint.screenSpaceY)
    //   ctx.lineTo(endPoint.screenSpaceX, endPoint.screenSpaceY)
    //   ctx.stroke();
    //   ctx.closePath()
    //   ctx.fillStyle = this.verticeColor.toHtmlRgba()
    //   // ctx.fillRect(startPoint.screenSpaceX - 2, startPoint.screenSpaceY - 2, 4, 4);
    // })

    // this.sortFacesByDepth()
    // this.faces.forEach((face) => {
      
    //   let facePoints = this.getPointsFromFace(face)
    //   let avgPoint = averagePoint(facePoints)
    //   let faceVector = avgPoint.getVectorTo(this.location)
    //   faceVector.invert()
    //   let faceCull = faceVector.dotProduct(avgPoint.getVectorTo(camera.location)) <= 0 ? true : false
    //   if(!this.done){
    //     if(face == this.faces[4]){
    //       console.log(faceCull)
    //     }
    //   }
    //   if (!faceCull) {
    //     ctx.beginPath()
    //     ctx.moveTo(facePoints[0].screenSpaceX, facePoints[0].screenSpaceY)
    //     ctx.lineTo(facePoints[1].screenSpaceX, facePoints[1].screenSpaceY)
    //     ctx.lineTo(facePoints[2].screenSpaceX, facePoints[2].screenSpaceY)
    //     ctx.lineTo(facePoints[3].screenSpaceX, facePoints[3].screenSpaceY)
    //     ctx.closePath()

    //     let color = this.faceColors[this.faces.indexOf(face)]
    //     ctx.fillStyle = color.toHtmlRgba()

    //     // ctx.fillStyle = RGBA(this.faceColors[this.faces.indexOf(face)])
    //     ctx.fill()
    //   }
    //   ctx.fillStyle = Color.DEFAULTS.pink.toHtmlRgba()
    //   ctx.fillRect(avgPoint.screenSpaceX - 2, avgPoint.screenSpaceY - 2, 4, 4);
      
    // })

    // this.points.forEach((point) => {
    //   let idx = this.points.indexOf(point)
    //   ctx.fillStyle = Color.DEFAULTS.white.toHtmlRgba();
    //   // ctx.font = "20px Veranda"
    //   ctx.fillText(`${idx}`, point.screenSpaceX, point.screenSpaceY);
    //   ctx.fillStyle = this.verticeColor.toHtmlRgba()
    //   ctx.fillRect(point.screenSpaceX - 2, point.screenSpaceY - 2, 4, 4);
    // });

    // this.faces.forEach((face) => {
    //   // let facePoints = this.getPointsFromFace(face)
    //   // let avgDistanceFromCamera = (facePoints[0].inPerspectiveSpace.w + 
    //   //                               facePoints[1].inPerspectiveSpace.w + 
    //   //                               facePoints[2].inPerspectiveSpace.w + 
    //   //                               facePoints[3].inPerspectiveSpace.w) / 4
    //   // let avgScreenSpaceX = (facePoints[0].screenSpaceX + 
    //   //                         facePoints[1].screenSpaceX + 
    //   //                         facePoints[2].screenSpaceX + 
    //   //                         facePoints[3].screenSpaceX) / 4
    //   // let avgScreenSpaceY = (facePoints[0].screenSpaceY + 
    //   //                         facePoints[1].screenSpaceY + 
    //   //                         facePoints[2].screenSpaceY + 
    //   //                         facePoints[3].screenSpaceY) / 4
    //   let facePoints = this.getPointsFromFace(face)
    //   let avgPoint = averagePoint(facePoints)
    //   ctx.fillStyle = Color.DEFAULTS.white.toHtmlRgba();
    //   ctx.font = "20px Veranda"
    //   let faceVector = avgPoint.getVectorTo(this.location)
    //   faceVector.invert()
    //   let faceCull = faceVector.dotProduct(avgPoint.getVectorTo(camera.location)) <= 0 ? true : false
    //   ctx.fillText(`${faceCull ? "hide": "show"}`, avgPoint.screenSpaceX, avgPoint.screenSpaceY);
    // })
    this.done = true;
  }
  
  rotate(axis, angle, origin=this){
    this.location.rotate(axis, angle)
    if(this.mesh){
      this.mesh.rotate(axis, angle)
    }
  }

  translate(vector){
    this.location.add(vector)
    if(this.mesh){
      this.mesh.translate(vector)
    }
  }

  tick() {}
}
