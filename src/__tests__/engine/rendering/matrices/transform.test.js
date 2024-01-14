const Transform = require("../../../../js/engine/rendering/matrices/Transform");
const Matrix = require("../../../../js/engine/rendering/matrices/Matrix");

test("translate positive 3D", () => {
  let A = [[1], [2], [3], [1]]
  let translationMatrix = Transform.TranslationMatrix3D(1, 2, 3)
  let result = [[2], [4], [6], [1]]
  expect(Matrix.dot(translationMatrix, A)).toEqual(result)
})

test("translate negative 3D", () => {
  let A = [[1], [2], [3], [1]]
  let translationMatrix = Transform.TranslationMatrix3D(-7, -6, -5)
  let result = [[-6], [-4], [-2], [1]]
  expect(Matrix.dot(translationMatrix, A)).toEqual(result)
})

test("rotate positive x 3D", () => {
  let angle = 0.4
  let A = [[1], [2], [3], [1]]
  let rotationMatrix = Transform.RotationMatrix3D("x", angle)
  let result = [[1], 
                [2*Math.cos(angle)-3*Math.sin(angle)], 
                [3*Math.cos(angle)+2*Math.sin(angle)],
                [1]
              ]
  expect(Matrix.dot(rotationMatrix, A)).toEqual(result)
});

test("rotationMatrix", () => {
  let angle = 0.4
  let rotationMatrix = Transform.RotationMatrix3D("y", angle)
  expect(rotationMatrix).toEqual([
    [Math.cos(angle), 0, Math.sin(angle), 0],
    [0, 1, 0, 0],
    [-Math.sin(angle), 0, Math.cos(angle), 0],
    [0, 0, 0, 1],
  ])
})

test("rotate positive y 3D", () => {
  let A = [[1], [2], [3], [1]]
  let angle = 0.4
  let rotationMatrix = Transform.RotationMatrix3D("y", angle)

  let expectedResult = [[2.08929], 
                        [2], 
                        [2.3737],
                        [1]]
  let result = Matrix.dot(rotationMatrix, A)
  result.forEach((x, i) => {
    expect(x.length).toEqual(1)
    expect(x[0]).toBeCloseTo(expectedResult[i][0])
  })    
});

test("rotate negative y 3D", () => {
  let A = [[1], [2], [3], [1]]
  let angle = -0.4
  let rotationMatrix = Transform.RotationMatrix3D("y", angle)
  let expectedResult = [[-0.24719], 
                        [2], 
                        [3.15260],
                        [1]]
  let result = Matrix.dot(rotationMatrix, A)
  result.forEach((x, i) => {
    expect(x.length).toEqual(1)
    expect(x[0]).toBeCloseTo(expectedResult[i][0])
  })    
});

test("rotate positive z 3d", () => {
  let A = [[1], [2], [3], [1]]
  let angle = 0.4
  let rotationMatrix = Transform.RotationMatrix3D("z", angle)
  let expectedResult = [[0.14222], 
                        [2.23154], 
                        [3],
                        [1]]
  let result = Matrix.dot(rotationMatrix, A)
  result.forEach((x, i) => {
    expect(x.length).toEqual(1)
    expect(x[0]).toBeCloseTo(expectedResult[i][0])
  })    
})

test("scale positive", () => {
  let A = [[1], [2], [3], [1]]
  let scaleMatrix = Transform.ScaleMatrix3D(2, 2, 2)
  expect(Matrix.dot(scaleMatrix, A)).toEqual([[2], [4], [6], [1]])
})