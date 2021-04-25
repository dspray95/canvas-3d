import { Camera } from "../../js/engine/rendering/Camera"
import { TestingCameraConfig } from "../../js/engine/rendering/CameraConfig"
import Point from "../../js/engine/rendering/objects/primitives/Point"
import {dot} from "../../js/engine/rendering/matrices/Matrix"
import Vector from "../../js/engine/rendering/objects/primitives/Vector";
import { getIntersectPoint } from "../../js/tools/Trig";

test("camera getPerspectiveMatrix", () => {
  let near = 10
  let far = 1000
  let alpha = 1.5
  let projectionMatrix = Camera.getPerspeciveMatrix(alpha, far, near)
  
  expect(projectionMatrix[0][0]).toBeCloseTo(1.07343)
  expect(projectionMatrix[1][1]).toBeCloseTo(1.07343)
  expect(projectionMatrix[2][2]).toBeCloseTo(1.02020)
  expect(projectionMatrix[2][3]).toEqual(-1)
  expect(projectionMatrix[3][2]).toBeCloseTo(20.2020)
})

test("camera getCameraToOriginMatrix", () => {
  // The camera to origin matrix should bring the camera location to the 
  // origin of the worldspace, so if the camera location is multiplied by this
  // matrix, then it's new location should equal the worldspace origin
  // In this case the origin is (0, 0, 0, 1)
  let cameraLocation = new Point(0, 10, 100)
  let cameraViewingDirection = new Vector(0, 0.5, 0.5)
  let cameraToOriginMatrix = Camera.getCameraToOriginMatrix(cameraLocation, 
                                                            cameraViewingDirection)
  let translatedToOriginMatrix = dot(cameraToOriginMatrix, cameraLocation.matrix)
  expect(translatedToOriginMatrix[0][0]).toEqual(0)
  expect(translatedToOriginMatrix[1][0]).toEqual(0)
  expect(translatedToOriginMatrix[2][0]).toEqual(0)
  expect(translatedToOriginMatrix[3][0]).toEqual(1)
})

test("camera projectPoint", () => {
  let camera = new Camera(
    TestingCameraConfig.CAMERA_START_LOCATION,
    TestingCameraConfig.CAMERA_START_VIEWING_DIRECTION,
    TestingCameraConfig.CAMERA_START_UP_DIRECTION,
    TestingCameraConfig.VIEWPORT_WIDTH,
    TestingCameraConfig.VIEWPORT_HEIGHT,
    TestingCameraConfig.FOV,
    TestingCameraConfig.NEAR,
    TestingCameraConfig.FAR
  )

  let pointToProject = new Point(100, 100, 100, 1)
  camera.projectPointToPerspectiveSpace(pointToProject)
  expect(pointToProject.inPerspectiveSpace.x).toBeCloseTo(107.343)
  expect(pointToProject.inPerspectiveSpace.y).toBeCloseTo(107.343)
  expect(pointToProject.inPerspectiveSpace.z).toBeCloseTo(101.0202)
  expect(pointToProject.inPerspectiveSpace.w).toBeCloseTo(2020.202)
})

test("camera pointToScreenSpace", () => {
  let camera = new Camera(
    TestingCameraConfig.CAMERA_START_LOCATION,
    TestingCameraConfig.CAMERA_START_VIEWING_DIRECTION,
    TestingCameraConfig.CAMERA_START_UP_DIRECTION,
    TestingCameraConfig.VIEWPORT_WIDTH,
    TestingCameraConfig.VIEWPORT_HEIGHT,
    TestingCameraConfig.FOV,
    TestingCameraConfig.NEAR,
    TestingCameraConfig.FAR
  )
  //Same projected point from projectPoint test
  let projectedPoint = new Point(100, 100, 100, 1)
  projectedPoint.inPerspectiveSpace = new Point(107.343, 107.343, 101.0202, 2020.202)
  projectedPoint.inPerspectiveSpace.divideByW()
  camera.projectPointToScreenSpace(projectedPoint)
  expect(projectedPoint.screenSpaceX).toBeCloseTo(1062.0187)
  expect(projectedPoint.screenSpaceY).toBeCloseTo(597.3855)
})

test("camera clipping plane", () => {
  let camera = new Camera()
  camera.near = 1
  camera.far = 1000
  let pointB = new Point(10, 10, -100, -1)
  let pointA = new Point(10, 10, 100, 1)
  let intersectPoint = camera.clipLine(pointA, pointB).intersectPoint
  expect(intersectPoint.x).toEqual(10)
  expect(intersectPoint.y).toEqual(10)
  expect(intersectPoint.z).toEqual(0)
  expect(intersectPoint.w).toEqual(0)
})

test("camera perspectivePointProjectionPipeline", () => {
  let camera = new Camera(
    TestingCameraConfig.CAMERA_START_LOCATION,
    TestingCameraConfig.CAMERA_START_VIEWING_DIRECTION,
    TestingCameraConfig.CAMERA_START_UP_DIRECTION,
    TestingCameraConfig.VIEWPORT_WIDTH,
    TestingCameraConfig.VIEWPORT_HEIGHT,
    TestingCameraConfig.FOV,
    TestingCameraConfig.NEAR,
    TestingCameraConfig.FAR
  )
  let pointToProject = new Point(100, 100, 100, 1)
  camera.perspectivePointProjectionPipeline(pointToProject)
  expect(pointToProject.screenSpaceX).toBeCloseTo(1062.0187)
  expect(pointToProject.screenSpaceY).toBeCloseTo(597.3855)
})