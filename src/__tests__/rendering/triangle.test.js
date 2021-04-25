import Point from "../../js/engine/rendering/objects/primitives/Point"
import Triangle from "../../js/engine/rendering/objects/primitives/Triangle"
import { Color } from "../../js/tools/Colors"

test("triangle surface normal", () => {
  let A = new Point(0, 0, 0)
  let B = new Point(0, 0, 5)
  let C = new Point(5, 0, 0)
  let tri = new Triangle(A, B, C, Color.BLUE)
  tri.calculateNormal()
  console.log(tri.normal)
  expect(tri.normal.x).toEqual(0)
  expect(tri.normal.y).toEqual(1)
  expect(tri.normal.z).toEqual(0)
  expect(tri.normal.length).toEqual(1)
});

test("triangle centroid", () => {
  let A = new Point(0, 0, 0)
  let B = new Point(0, 0, 5)
  let C = new Point(5, 0, 0)

  let tri = new Triangle(A, B, C, Color.BLUE)
  expect(tri.planeCentre.x).toBeCloseTo(1.666)
  expect(tri.planeCentre.y).toBeCloseTo(0)
  expect(tri.planeCentre.z).toBeCloseTo(1.666)
})