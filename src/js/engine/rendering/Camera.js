import { RotationMatrix3D, TranslationMatrix3D } from "./matrices/Transform"
import { dot } from "./matrices/Matrix"
import { cot } from "../../tools/Trig"
import Point from "./objects/primitives/Point"

class Camera{
  
  constructor(
    parent,
    viewportWidth,
    viewportHeight,
    cameraConfig
  ) {
    this.parent = parent
    this.location = cameraConfig.CAMERA_START_LOCATION

    this.viewportWidth = viewportWidth
    this.viewportHeight = viewportHeight

    this.name = cameraConfig.NAME

    //positioning variables
    this.viewingDirection = cameraConfig.CAMERA_START_VIEWING_DIRECTION;
    this.upDirection = cameraConfig.CAMERA_START_UP_DIRECTION;

    //clipping and perspective variables
    this.fov = cameraConfig.DEFAULT_FOV;
    this.near = cameraConfig.NEAR;
    this.far = cameraConfig.FAR

    //matrix setup
    this.perspectiveMatrix = Camera.getPerspeciveMatrix(
                                      this.fov,
                                      this.far,
                                      this.near
                                    )
    this.cameraToOriginMatrix = Camera.getCameraToOriginMatrix(
      this.location, 
      this.viewingDirection
    )
    
  }

  resize(viewportWidth, viewportHeight, cameraConfig){
    this.viewportWidth = viewportWidth
    this.viewportHeight = viewportHeight

    if(viewportWidth > viewportHeight){
      this.fov = cameraConfig.DEFAULT_FOV
    } else if(viewportWidth > viewportHeight){
      this.fov = cameraConfig.VERTICAL_SCREEN_FOV
    }

    this.perspectiveMatrix = Camera.getPerspeciveMatrix(
      this.fov,
      this.far,
      this.near
    )
  }

  perspectivePointProjectionPipeline(point){
    //Move point into perspective space by applying the camera transform
    this.projectPointToPerspectiveSpace(point)
    // //Divide by w!
    point.inPerspectiveSpace.divideByW()
    // //Finally move the point from perspecitve space into screen space
    this.projectPointToScreenSpace(point)
  }

  projectPointToPerspectiveSpace(point) {
    //Move the point to be relative to (0, 0, 0) by doing:
    //  P = cameraToOriginMatrix * point.matrix
    //then project this point to perspective view with:
    //  Q = perspectiveMatrix * P
    let pointToOriginMatrix = dot(this.cameraToOriginMatrix, point.matrix);
    let pointToPerspectiveMatrix = dot(this.perspectiveMatrix, 
                                      pointToOriginMatrix);
    point.inPerspectiveSpace = new Point(
      pointToPerspectiveMatrix[0][0],
      pointToPerspectiveMatrix[1][0],
      pointToPerspectiveMatrix[2][0],
      pointToPerspectiveMatrix[3][0]
    );
  }

  projectPointToScreenSpace(projectedPoint) {
    projectedPoint.screenSpaceX =
      projectedPoint.inPerspectiveSpace.x * this.viewportWidth 
        + this.viewportWidth * 0.5;
    projectedPoint.screenSpaceY =
      projectedPoint.inPerspectiveSpace.y * this.viewportHeight
        + this.viewportHeight * 0.5
  }

  clipLine(A, B){
      if(A.w < this.near && B.w < this.near){
        //Both points behind the clipping plane
        return {showLine: false, intersectVector: null}
      }
      else if(A.w >= this.near && B.w >= this.near){
        //Both points in front of the clipping plane
        return {showLine: true, intersectVector: null}
      }
      else{
        //one of the points is behind the clipping plane, 
        //and one is in front
        //We need to find where the line intersects the plane, 
        //this will be the new point to which we draw
        let n = (A.w - this.near) / (A.w - B.w)
        let xIntersects = (n * A.x) + ((1-n) * B.x)
        let yIntersects = (n * A.y) + ((1-n) * B.y)
        let zIntersects = (n * A.z) + ((1-n) * B.z)
        let wIntersects = this.near
        // The point where the line intersects with the clipping plane
        let intersectPoint = new Point(
          xIntersects, 
          yIntersects, 
          zIntersects, 
          wIntersects
        )
        return {showLine: false, intersectPoint: intersectPoint}
      }
  }

  static getCameraToOriginMatrix(location, viewingDirection) {
    let translateToOrigin = new TranslationMatrix3D(
      -location.x,
      -location.y,
      -location.z
    );
    //Rotation angle to align to Y
    let theta =
      Math.atan(viewingDirection.x, viewingDirection.z) *
      (180 / Math.PI);
    //Rotation angle to align to |
    let phi = Math.atan(
      viewingDirection.y /
        Math.sqrt(
          Math.pow(viewingDirection.x, 2) +
            Math.pow(viewingDirection.z, 2)
        )
    );

    let rotateToYZ = new RotationMatrix3D("y", -theta);
    let rotateToZ = new RotationMatrix3D("z", phi);
    //Rz * Ryz * T
    //So first we have to apply the rotations required,
    //then we can apply the translation to these rotations in
    //the matrix
    return dot(dot(rotateToZ, rotateToYZ), translateToOrigin);
  }

  static getPerspeciveMatrix(alpha, far, near) {
    return [
      [cot(alpha / 2), 0, 0, 0],
      [0, cot(alpha / 2), 0, 0],
      [0, 0, (far + near) / (far - near), -1],
      [0, 0, (2 * far * near) / (far - near), 0],
    ];
  }
  
  translate(vector){
    this.location.add(vector)
    this.perspectiveMatrix = Camera.getPerspeciveMatrix(
      this.fov,
      this.far,
      this.near
    );
    this.cameraToOriginMatrix = Camera.getCameraToOriginMatrix(this.location, 
                                  this.viewingDirection);
  }

  rotate(axis, radians){
    //TODO there's something wrong here
    //The viewing direction updates correctly, the cam to origin is as expected,
    //but the viewport doesn't match the rotation amount
    //eg we can rotate 90 degrees, but the display seems to be rotated some arbitrary amount
    //rotating 180 degress inverts the view direction, but the display is still in the original position
    //BUT if we rotate by small amounts (~0.0001rad) the display *looks* normal :s
    this.viewingDirection = this.viewingDirection.rotate(axis, radians)
    this.cameraToOriginMatrix = Camera.getCameraToOriginMatrix(this.location, 
      this.viewingDirection);
  }

  tick(){

  }
}


export { Camera };
