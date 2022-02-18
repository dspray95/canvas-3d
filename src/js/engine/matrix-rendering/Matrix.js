import { TranslationMatrix3D, RotationMatrix3D } from "../rendering/matrices/Transform"

class Matrix {

  static dot = (A, B) => {
    var result = new Array(A.length)
      .fill(0)
      .map((row) => new Array(B[0].length).fill(0));
  
    return result.map((row, i) => {
      return row.map((val, j) => {
        return A[i].reduce((sum, elm, k) => sum + elm * B[k][j], 0);
      });
    });
  }
  
  static dotSlow = (m1, m2) => {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
      result[i] = [];
      for (var j = 0; j < m2[0].length; j++) {
        var sum = 0;
        for (var k = 0; k < m1[0].length; k++) {
          sum += m1[i][k] * m2[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }
  
  static rotate = (matrix, axis, radians) => {
    let rotationMatrix = RotationMatrix3D(axis, radians);
    return Matrix.dot(rotationMatrix, matrix);

  }
  
  static translate = (matrix, x, y, z) => {
    let translationMatrix = TranslationMatrix3D(x, y, z);
    return Matrix.dot(translationMatrix, matrix)
  }
  
}


export { Matrix };
