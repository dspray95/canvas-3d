import { Color } from "../../tools/Colors";
import { Point, averageDimension, averagePoint } from "../rendering/rendering-objects/primitives/Point";
import { Worldspace } from "../worldspaces/Worldspace";

export default class WorldObject {
  constructor(location, parent, name="WorldObject") {
    this.location = location;
    this.parent = parent;
    this.points = [];
    this.perspectivePoints = [];
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
