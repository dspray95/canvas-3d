// class Coordinate3D {
//   constructor(xPos, yPos, zPos, isVector = false) {
//     let w = isVector ? 0 : 1;
//     this.coordMatrix = [xPos, yPos, zPos, w];
//     this.updateLocationValues();
//   }

//   updateLocationValues() {
//     this.x = this.coordMatrix[0];
//     this.y = this.coordMatrix[1];
//     this.z = this.coordMatrix[2];
//     this.w = this.coordMatrix[3];
//   }

//   add(otherCoordMatrix) {
//     this.coordMatrix[0] += otherCoordMatrix.coordMatrix[0];
//     this.coordMatrix[1] += otherCoordMatrix.coordMatrix[1];
//     this.coordMatrix[2] += otherCoordMatrix.coordMatrix[2];
//     this.updateLocationValues();
//   }
// }

// export { Coordinate3D };
