import Vector from "../../js/engine/rendering/objects/primitives/Vector"

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

test("rotateVector", () => {
  let vector = new Vector(10, 10, 10)
  vector.rotate("x", 90)
  expect(vector.x).toEqual(10)
  expect(vector.y).toBeCloseTo(-13.42)
  expect(vector.z).toBeCloseTo(4.459)
  vector = new Vector(10, 10, 10)
  vector.rotate("y", 90)
  expect(vector.x).toBeCloseTo(4.459)
  expect(vector.y).toEqual(10)
  expect(vector.z).toBeCloseTo(-13.42)
  vector = new Vector(10, 10, 10)
  vector.rotate("z", 90)
  expect(vector.x).toBeCloseTo(-13.42)
  expect(vector.y).toBeCloseTo(4.459)
  expect(vector.z).toEqual(10)
})
