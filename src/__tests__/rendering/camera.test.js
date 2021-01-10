import { Camera } from "../../js/rendering/Camera"
import Point from "../../js/rendering/Point"
import {Matrix} from "../../js/rendering/matrices/Matrix"
import Vector from "../../js/rendering/Vector";

test("camera image space -near to near", () => {
  let cameraLoc = new Point(0, 0, 0);
  let viewingDirection = new Vector(0, 0, 1)
  let upDirection = new Vector(0, 1, 0)
  let viewportWidth = 1920
  let viewportHeight = 1080
  let fov = 90;
  let near = 100;
  let far = 1000;
  let camera = new Camera(
    this,
    cameraLoc,
    viewingDirection,
    upDirection,
    fov,
    near,
    far,
    viewportWidth,
    viewportHeight
  );

  let viewingAngle = 1.0 / Math.tan(0.45/2.0)
  console.log(camera.projectionMatrix)
  let projectionMatrix = camera.projectionMatrix(viewingAngle, far, near)
  let nearMatrix = [[0], [0], [near], 1]
  let projectedPointMatrix = Matrix.dot(projectionMatrix, nearMatrix)
  console.log(projectedPointMatrix)
  expect(projectedPointMatrix).toEqual(
    [[0], [0], [-near], 1]
  )
})

test("camera image space -far to far", () => {
  //0, 0, -FAR == 0, 0, FAR
})

test("camera image space N top point to 0, 0, 1", () => {

})

test("camera image space N bottom point to 0, 0, -1", () => {

})