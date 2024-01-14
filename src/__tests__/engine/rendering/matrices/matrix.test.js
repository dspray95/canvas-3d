const Matrix = require("../../../../js/engine/rendering/matrices/Matrix");

test('matrix dot(ROW*COL)', () =>{
  let A = [[1, 2, 3]];
  let B = [[1],[2],[3]];
  expect(Matrix.dot(A, B)).toEqual([[14]])
});

test('matrix dot(COL*ROW)', () => {
  let A = [[1], [2], [3]];
  let B = [[1, 2, 3]];
  let result = [[1, 2, 3],
                [2, 4, 6],
                [3, 6, 9]];
  expect(Matrix.dot(A, B)).toEqual(result)
})

test('matrix dot(3x3*3x3)', () => {
  let A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  let B = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  let result = [[30, 36, 42],
                [66, 81, 96],
                [102, 126, 150]]
    expect(Matrix.dot(A, B)).toEqual(result)
})

test('matrix dot(4x4*4x4)', () => {
  let A = [[1, 2, 3, 4], [5, 6, 7, 8], [1, 2, 3, 4], [5, 6, 7, 8]]
  let B = [[1, 2, 3, 4], [5, 6, 7, 8], [1, 2, 3, 4], [5, 6, 7, 8]]
  let result = [[34, 44, 54, 64], 
                [82, 108, 134, 160], 
                [34, 44, 54, 64], 
                [82, 108, 134, 160]]
    expect(Matrix.dot(A, B)).toEqual(result)
})

test('matrix dot(4x4*1x4)', () => {
  let A = [[1], [2], [3], [1]]
  let B = [
    [0.9, 0, 0.4, 0],
    [0, 1, 0, 0],
    [-0.4, 0, 0.9, 0],
    [0, 0, 0, 1],
  ]
  let expectedResult = [
    [2.1],
    [2],
    [2.3],
    [1]
  ]
  let result = Matrix.dot(B, A)
  result.forEach((x, i) => {
    expect(x.length).toEqual(1)
    // Floating point makes toEqual fail on the array
    expect(x[0]).toBeCloseTo(expectedResult[i][0])
  })
})

test('rotationMatrix dot(4x4*1x4)', () => {
  let angleRadians = 0.4
  let angleDegrees = 0.4
  let rotationMatrix = [[Math.cos(angleDegrees), 0, Math.sin(angleRadians), 0],
                          [0, 1, 0, 0],
                          [-Math.sin(angleRadians), 0, Math.cos(angleDegrees), 0],
                          [0, 0, 0, 1],
                        ]
  let A = [[1], [2], [3], [1]]
  let result = Matrix.dot(rotationMatrix, A)
  let expectedResult = [[2.08929], 
                  [2], 
                  [2.3737],
                  [1]]
  
  result.forEach((x, i) => {
    expect(x.length).toEqual(1)
    expect(x[0]).toBeCloseTo(expectedResult[i][0])
  })
  
})