import { RGBA, colors } from "../../../tools/Colors";
import { Point } from "../Point";
import { dot } from "../matrices/Matrix";
export default class Primitive {
  constructor(location, parent) {
    this.location = location;
    this.parent = parent;
    this.points = [];
    this.perspectivePoints = [];
    this.edges = [[0, 1]];
    this.done = false;
    this.verticeColor = colors.yellow;
    this.lineColor = colors.blue;
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
      let projectingPoint = point.copy();
      projectingPoint.add(projectingPoint.getVectorTo(this.location));
      let cameraAP = camera.project(projectingPoint);
      let projectedPoint = new Point(
        cameraAP[0][0],
        cameraAP[0][1],
        cameraAP[0][2],
        cameraAP[0][3]
      );
      projectedPoint.screenSpaceX =
        projectedPoint.screenSpaceX * camera.viewportHeight +
        camera.viewportWidth * 0.5;
      projectedPoint.screenSpaceY =
        projectedPoint.screenSpaceY * camera.viewportHeight +
        camera.viewportHeight * 0.5;
      // console.log(
      //   `drawing at x:${projectedPoint.screenSpaceX}, y:${projectedPoint.screenSpaceY}`
      // );
      this.perspectivePoints.push(projectedPoint);
    });
  }

  drawPerspective(ctx, camera) {
    this.perspectiveCalculations(camera);

    ctx.fillStyle = RGBA(this.verticeColor);

    this.edges.forEach((edge) => {
      ctx.beginPath();
      let currentLocation = this.perspectivePoints[edge[0]];
      ctx.moveTo(currentLocation.screenSpaceX, currentLocation.screenSpaceY);
      for (let i = 1; i < edge.length; i++) {
        currentLocation = this.perspectivePoints[edge[i]];
        ctx.lineTo(currentLocation.screenSpaceX, currentLocation.screenSpaceY);
      }
      ctx.strokeStyle = RGBA(this.lineColor);
      ctx.stroke();
    });

    this.perspectivePoints.forEach((point) => {
      ctx.fillRect(point.screenSpaceX - 2, point.screenSpaceY - 2, 4, 4);
      // console.log(projectedPoint);
      // console.log(point.matrix);
    });
  }

  tick() {}
}
