import { VectorRotationMatrix3D } from "./matrices/Transform";
import Point from "./rendering-objects/primitives/Point";
import Vector from "./rendering-objects/primitives/Vector";

class CameraConfig{

  static CAMERA_START_LOCATION = new Point(0, 0, 0) 
  static CAMERA_START_VIEWING_DIRECTION = new Vector(0, 0, -1)
  static CAMERA_START_UP_DIRECTION = new Vector(0, 1, 0)
  static DEFAULT_VIEWPORT_WIDTH = 1920
  static DEFAULT_VIEWPORT_HEIGHT = 1080
  static DEFAULT_FOV = 1.4 //Radians (default 90Deg)
  static NEAR = 1
  static FAR = 1000

}

class TestingCameraConfig {
  static CAMERA_START_LOCATION = new Point(0, 0, 0)
  static CAMERA_START_VIEWING_DIRECTION = new Vector(0, 0, 1)
  static CAMERA_START_UP_DIRECTION = new Vector(0, 1, 0)
  static VIEWPORT_WIDTH = 1920
  static VIEWPORT_HEIGHT = 1080
  static FOV = 1.5 //Radians (default 90Deg)
  static NEAR = 10
  static FAR = 1000
}

export {CameraConfig, TestingCameraConfig}