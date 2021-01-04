import { RGBA, colors } from "../../../tools/Colors";
import { Point } from "../Point";
import { dot } from "../matrices/Matrix";
export default class Primitive {
  constructor(location, parent, name="Primitive") {
    this.location = location;
    this.parent = parent;
    this.points = [];
    this.perspectivePoints = [];
    this.edges = [];
    this.lines = []
    this.done = false;
    this.verticeColor = colors.yellow;
    this.lineColor = colors.blue;
    this.name = name
    this.logPerspectivePos = false;
    this.logged = false;
  }

  drawOrtho(ctx) {
    ctx.fillStyle = RGBA(colors.yellow);
    this.points.forEach((point) => {
      point.orthographicSpace();
      // console.log(`drawing at ${vertex.screenSpaceX + this.location.x}`);
      ctx.fillRect(
        point.screenSpaceX + this.location.x,
        point.screenSpaceY + this.location.y,
        2,
        2
      );
    });
  }

  perspectiveCalculations(camera) {
    this.perspectivePoints = [];

    this.points.forEach((point) => {
      let pointCopy = point.copy();
      pointCopy.add(pointCopy.getVectorTo(this.location));

      let projectedPoint = camera.projectPoint(pointCopy);
      // camera.pointToScreenSpace(projectedPoint)

      this.perspectivePoints.push(projectedPoint);
    });
  }

  drawPerspective(ctx, camera) {
    this.perspectiveCalculations(camera);

    ctx.fillStyle = RGBA(this.verticeColor);
    ctx.strokeStyle = RGBA(this.lineColor);

    this.lines.forEach((line) => {
      let pointA = this.perspectivePoints[line[0]]
      let pointB = this.perspectivePoints[line[1]]
      //Do clipping
      let clipResults = camera.clipLine(pointA, pointB)
      if (clipResults.showLine && clipResults.intersectVector !== null){
        if(pointA.w > pointB.w){
          pointB = clipResults.intersectVector
        }
        else(
          pointA = clipResults.intersectVector
        )
      }
      else if (!clipResults.showLine){
        return
      }
      
      //Do screen space projection
      if (!pointA.toScreenSpace){
        camera.pointToScreenSpace(pointA)
        pointA.toScreenSpace = true;
      }
      if (!pointB.toScreenSpace){
        camera.pointToScreenSpace(pointB)
        pointB.toScreenSpace = true;
      }

      //Draw wireframe
      ctx.beginPath()
      ctx.moveTo(pointA.screenSpaceX, pointA.screenSpaceY)
      ctx.lineTo(pointB.screenSpaceX, pointB.screenSpaceY)
      
      ctx.stroke();
    })

    // this.edges.forEach((edge) => {

    //   let edgeStart = camera.pointToScreenSpace(this.perspectivePoints[edge[0]])
  
    //   ctx.beginPath();
    //   let currentLocation = this.perspectivePoints[edge[0]];
    //   ctx.moveTo(currentLocation.screenSpaceX, currentLocation.screenSpaceY);
    //   for (let i = 1; i < edge.length; i++) {
    //     currentLocation = this.perspectivePoints[edge[i]];
    //     ctx.lineTo(currentLocation.screenSpaceX, currentLocation.screenSpaceY);
    //   }
    //   ctx.strokeStyle = RGBA(this.lineColor);
    //   ctx.stroke();
    // });

    this.perspectivePoints.forEach((point) => {
      ctx.fillRect(point.screenSpaceX - 2, point.screenSpaceY - 2, 4, 4);
    });
  }

  tick() {}
}
