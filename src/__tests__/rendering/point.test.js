import Point from "../../js/rendering/Point"

test("point add", () => {
  let pointA = new Point(10, 10, 10)
  let pointB = new Point(10 ,10, 10)
  pointA.add(pointB)
  expect(pointA.x).toEqual(20)
  expect(pointA.y).toEqual(20)
  expect(pointA.z).toEqual(20)
  expect(pointA.w).toEqual(1)
  expect(pointB.x).toEqual(10)
  expect(pointB.y).toEqual(10)
  expect(pointB.z).toEqual(10)
  expect(pointB.w).toEqual(1)
})

test("point translate", () => {
  let pointA = new Point(10, 10, 10)
  pointA.translate(10, 20, 30)
  expect(pointA.x).toEqual(20)
  expect(pointA.y).toEqual(30)
  expect(pointA.z).toEqual(40)
  expect(pointA.w).toEqual(1)
})

test("point scale", () => {
  let pointA = new Point(1, 1, 1)
  pointA.scale(10, 10, 10);
  expect(pointA.x).toEqual(10)
  expect(pointA.y).toEqual(10)
  expect(pointA.z).toEqual(10)
  expect(pointA.w).toEqual(1)
  expect(pointA.matrix).toEqual([[10], [10], [10], [1]])
})

test("point rotate x", () => {
  let pointA = new Point(10, 10, 0)
  let rotationAngle = 1.5708 //about 90degrees
  pointA.rotate("x", rotationAngle)
  expect(pointA.x).toBeCloseTo(10)
  expect(pointA.y).toBeCloseTo(0.00003)
  expect(pointA.z).toBeCloseTo(10)
  expect(pointA.w).toEqual(1)
})

test("point rotate y", () => {
  let pointA = new Point(10, 10, 10)
  let rotationAngle = 1.5708
  pointA.rotate("y", rotationAngle)
  expect(pointA.x).toBeCloseTo(9.99996)
  expect(pointA.y).toBeCloseTo(10)
  expect(pointA.z).toBeCloseTo(-10.00003)
  expect(pointA.w).toEqual(1)
})

test("point rotate z", () => {
  let pointA = new Point(10, 10, 0)
  let rotationAngle = 1.5708
  pointA.rotate("z", rotationAngle)
  expect(pointA.x).toBeCloseTo(-10.00003)
  expect(pointA.y).toBeCloseTo(9.99996)
  expect(pointA.z).toBeCloseTo(0)
  expect(pointA.w).toEqual(1)

})

test("multi rotate", () => {
  let pointA = new Point(10, 10, 0)
  let rotationAngle = 1.5708
  pointA.rotate("z", rotationAngle)
  pointA.rotate("x", rotationAngle)
  expect(pointA.x).toBeCloseTo(-10.00003)
  expect(pointA.y).toBeCloseTo(-0.00003)
  expect(pointA.z).toBeCloseTo(9.99996)
  expect(pointA.w).toEqual(1)
})

test("set matrix", () => {
  let pointA = new Point(0, 0, 0)
  pointA.setMatrix(10, 10, 10, 1)
  expect(pointA.matrix).toEqual([[10], [10], [10], [1]])
  expect(pointA.x).toEqual(10)
  expect(pointA.y).toEqual(10)
  expect(pointA.z).toEqual(10)
  expect(pointA.w).toEqual(1)
})

test("get vector to positive x", () => {
  let pointA = new Point(0, 0, 0)
  let pointB = new Point(10, 0, 0)
  let vector = pointA.getVectorTo(pointB)
  expect(vector.x).toEqual(10)
  expect(vector.y).toEqual(0)
  expect(vector.z).toEqual(0)
})

test("get vector to negative y", () => {
  let pointA = new Point(0, 0, 0)
  let pointB = new Point(-10, 0, 0)
  let vector = pointA.getVectorTo(pointB)
  expect(vector.x).toEqual(-10)
  expect(vector.y).toEqual(0)
  expect(vector.z).toEqual(0)
})