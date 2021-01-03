import { RotationMatrix3D, TranslationMatrix3D } from "./matrices/Transform";
import { dot } from "./matrices/Matrix";
import { cot } from "../../tools/Trig";

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
    this.fov = 90;
    //
    this.near = near;
    this.far = far;
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;
    this.perspectiveMatrix = viewingMatrix(this.fov, this.far, this.near);
    this.cameraToOriginMatrix = this.cameraToOrigin();
  }

  project(point) {
    let pointAsCameraSpace = dot(point.getMatrix(), this.cameraToOriginMatrix);
    let perspectivePoint = dot(pointAsCameraSpace, this.perspectiveMatrix);
    return perspectivePoint;
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

function viewingMatrix(alpha, far, near) {
  return [
    [cot(alpha / 2), 0, 0, 0],
    [0, cot(alpha / 2), 0, 0],
    [0, 0, far + near / far - near, -1],
    [0, 0, (2 * far * near) / far - near, 0],
  ];
}

function clippingMatrix() {}

export { Camera };
