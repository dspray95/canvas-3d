import { RotationMatrix3D, TranslationMatrix3D } from "./matrices/Transform";
import { dot } from "./matrices/Matrix";
import { cot } from "../../tools/Trig";
import Point from "./Point";

class Camera {
  constructor(
    parent,
    location,
    viewingDirection,
    upDirection,
    fov,
    near,
    far,
    viewportWidth,
    viewportHeight
  ) {
    this.parent = parent;
    this.location = location;
    this.viewingDirection = viewingDirection;
    this.upDirection = upDirection;
    this.fov = 1.0 / Math.tan(0.45/2.0);
    //
    this.near = near;
    this.far = far;
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;
    this.perspectiveMatrix = projectionMatrix(this.fov, this.far, this.near);
    this.cameraToOriginMatrix = this.cameraToOrigin();
  }

  projectPoint(point) {
    let pointAsCameraSpace = dot(point.getMatrix(), this.cameraToOriginMatrix);
    let perspectivePoint = dot(pointAsCameraSpace, this.perspectiveMatrix);
    return new Point(
      perspectivePoint[0][0],
      perspectivePoint[0][1],
      perspectivePoint[0][2],
      perspectivePoint[0][3]
    );;
  }

  pointToScreenSpace(projectedPoint) {
    projectedPoint.screenSpaceX =
      projectedPoint.screenSpaceX * this.viewportHeight +
      this.viewportWidth * 0.5;
    projectedPoint.screenSpaceY =
      projectedPoint.screenSpaceY * this.viewportHeight +
      this.viewportHeight * 0.5;
  }

  clipLine(A, B){
      if(A.w < this.near && B.w < this.near){
        return {showLine: false, intersectVector: null}
      }
      else if(A.w >= this.near && B.w >= this.near){
        return {showLine: true, intersectVector: null}
      }
      else{
        //one of the points is behind the clipping plane, 
        //and one is in front
        let n = (A.w - this.near) / (A.w - B.w)
        let xIntersects = (n * A.x) + ((1-n) * B.x)
        let yIntersects = (n * A.y) + ((1-n) * B.y)
        let zIntersects = (n * A.z) + ((1-n) * B.z)
        let wIntersects = this.near
        // The point where the line intersects with the clipping plane
        let intersectVector = new Point(
          xIntersects, 
          yIntersects, 
          zIntersects, 
          wIntersects
        )
        return {showLine: true, intersectVector: intersectVector}
      }
  }

  cameraToOrigin() {
    let theta =
      Math.atan(this.viewingDirection.x, this.viewingDirection.z) *
      (180 / Math.PI);

    let phi = Math.atan(
      this.viewingDirection.y /
        Math.sqrt(
          Math.pow(this.viewingDirection.x, 2) +
            Math.pow(this.viewingDirection.z, 2)
        )
    );

    let translateToOrigin = new TranslationMatrix3D(
      -this.location.x,
      -this.location.y,
      -this.location.z
    );
    let rotateToYZ = new RotationMatrix3D("y", -theta);
    let rotateToZ = new RotationMatrix3D("z", phi);

    let cameraToOrigin = dot(dot(translateToOrigin, rotateToZ), rotateToYZ);
    return dot(dot(rotateToZ, rotateToYZ), translateToOrigin);
  }

  originToCamera(origin) {
    let theta =
      Math.atan(this.viewingDirection.x, this.viewingDirection.z) *
      (180 / Math.PI);
    let phi = Math.atan(
      this.viewingDirection.y /
        Math.sqrt(
          Math.pow(this.viewingDirection.x, 2) +
            Math.pow(this.viewingDirection.z, 2)
        )
    );
    let rotateFromZ = dot(origin, new RotationMatrix3D("x", -phi));
    let rotateFromYZ = dot(rotateFromZ, new RotationMatrix3D("y", theta));
    let moveToCamera = dot(
      rotateFromYZ,
      new TranslationMatrix3D(this.location.x, this.location.y, this.location.z)
    );
    return moveToCamera;
  }
}

function projectionMatrix(alpha, far, near) {
  // [1, 0, 0, 0]
  // [0, 1, 0, 0]
  // [0, 0, a, -1]
  // [0, 0, b, 0]
  return [
    [cot(alpha / 2), 0, 0, 0],
    [0, cot(alpha / 2), 0, 0],
    [0, 0, far + near / far - near, -1],
    [0, 0, (2 * far * near) / far - near, 0],
  ];
}

function clippingMatrix() {}

export { Camera, projectionMatrix };
