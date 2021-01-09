  const dot = require(`${NODE_PATH}/js/rendering/matrices/Matrix/dot`)

  test('matrix multiply', () =>{
    let A = [1, 2, 3];
    let B = [[1],[2],[3]];
    expect(dot(A, B) == [1, 4, 9])
  });