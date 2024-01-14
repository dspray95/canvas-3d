import Vector from "../../../js/engine/rendering/objects/primitives/Vector"

test("dot product vector", () => {
  let vecA = new Vector(1, 2, 3)
  let vecB = new Vector(4, 5, 6)
  let dotProduct = vecA.dotProduct(vecB)
  expect(dotProduct).toEqual(4 + 10 + 18)
})

test("add vector", () => {
  let vecA = new Vector(1, 2, 3)
  let vecB = new Vector(4, 5, 6)
  let vecC = new Vector(7, 8, 9)
  let sumVector = vecA.add(vecB)
  sumVector = sumVector.add(vecC)

  expect(sumVector.x).toEqual(12)
  expect(sumVector.y).toEqual(15)
  expect(sumVector.z).toEqual(18)
})

test("subtract vector", () => {
  let vecA = new Vector(1, 2, 3)
  let vecB = new Vector(4, 5, 6)
  let vecC = new Vector(7, 8, 9)
  let sumVector = vecA.subtract(vecB)
  sumVector = sumVector.subtract(vecC)

  expect(sumVector.x).toEqual(-10)
  expect(sumVector.y).toEqual(-11)
  expect(sumVector.z).toEqual(-12)
})

test("get vector length", () => {
  //Positive
  let vector = new Vector(0, 0, 10)
  expect(vector.getLength()).toEqual(10)
  vector = new Vector(10, 0, 0)
  expect(vector.getLength()).toEqual(10)
  vector = new Vector(0, 10, 0)
  expect(vector.getLength()).toEqual(10)
  //Negative
  vector = new Vector(0, 0, -10)
  expect(vector.getLength()).toEqual(10)
  vector = new Vector(-10, 0, 0)
  expect(vector.getLength()).toEqual(10)
  vector = new Vector(0, -10, 0)
  expect(vector.getLength()).toEqual(10)
  //Multi dimension
  vector = new Vector(10, 10, 10)
  expect(vector.getLength()).toBeCloseTo(17.320508075688775)
  vector = new Vector(10, -10, -10)
  expect(vector.getLength()).toBeCloseTo(17.320508075688775)
})

test("create unit length vector", () => {
  let vector = new Vector(10, 10, 10)
  let unitLengthVector = vector.unitLengthVector()
  expect(unitLengthVector.x).toBeCloseTo(0.577)
  expect(unitLengthVector.y).toBeCloseTo(0.577)
  expect(unitLengthVector.z).toBeCloseTo(0.577)

  vector = new Vector(0, 0, 10)
  unitLengthVector = vector.unitLengthVector()
  expect(unitLengthVector.x).toEqual(0)
  expect(unitLengthVector.y).toEqual(0)
  expect(unitLengthVector.z).toEqual(1)
})

test("rotateVectorX", () => {
  let vector = new Vector(10, 10, 10)
  vector.rotate("x", 1.5708)
  expect(vector.x).toBeCloseTo(10)
  expect(vector.y).toBeCloseTo(-10)
  expect(vector.z).toBeCloseTo(9.999)
})

test("rotateVectorY", () => {
  let vector = new Vector(10, 10, 10)
  vector.rotate("y", 1.5708)
  expect(vector.x).toBeCloseTo(9.999963)
  expect(vector.y).toBeCloseTo(10)
  expect(vector.z).toBeCloseTo(-10)
})

test("rotateVectorZ", () => {
  let vector = new Vector(10, 10, 10)
  vector.rotate("z", 1.5708)
  expect(vector.x).toBeCloseTo(-10.00003)
  expect(vector.y).toBeCloseTo(9.999963)
  expect(vector.z).toBeCloseTo(10)
})