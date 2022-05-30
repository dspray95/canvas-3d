import Point from "../js/engine/rendering/objects/primitives/Point";
import Vector from "../js/engine/rendering/objects/primitives/Vector";

class CameraConfig{

  static CAMERA_START_LOCATION = new Point(0, 0, 0) 
  static CAMERA_START_VIEWING_DIRECTION = new Vector(0, 0, 1)
  static CAMERA_START_UP_DIRECTION = new Vector(0, 1, 0)
  static DEFAULT_FOV = 1.0472 //Radians (default 90Deg)
  static VERTICAL_SCREEN_FOV = 1.0472
  static NEAR = 1
  static FAR = 1000
  static NAME = "mainCamera"

}

class TestingCameraConfig {
  static CAMERA_START_LOCATION = new Point(0, 0, 0)
  static CAMERA_START_VIEWING_DIRECTION = new Vector(0, 0, -1)
  static CAMERA_START_UP_DIRECTION = new Vector(0, 1, 0)
  static VIEWPORT_WIDTH = 1920
  static VIEWPORT_HEIGHT = 1080
  static DEFAULT_FOV = 1.5 //Radians (default 90Deg)
  static VERTICAL_SCREEN_FOV = 1.0472
  static NEAR = 10
  static FAR = 1000
}

export {CameraConfig, TestingCameraConfig}