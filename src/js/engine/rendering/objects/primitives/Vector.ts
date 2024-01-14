import { RotationMatrix3D, VectorRotationMatrix3D } from "../../matrices/Transform";
import { dot } from "../../matrices/Matrix"

export default class Vector {
  
  matrix: number[][];
  x: number;
  y: number;
  z: number;
  length: number;

  constructor(x: number, y: number, z: number) {
    this.matrix = [[x], [y], [z]];
    this.x = x;
    this.y = y;
    this.z = z;
    this.length = this.getLength();
  }

  updateValues(){
    this.x = this.matrix[0][0]
    this.y = this.matrix[1][0]
    this.z = this.matrix[2][0]
    this.length = this.getLength()
  }

  updateMatrix(){
    this.matrix = [[this.x], [this.y], [this.z]]
    this.length = this.getLength()
  }

  scale(scalar: number) {
    return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  add(otherVector: Vector) {
    return new Vector(
      this.x + otherVector.x,
      this.y + otherVector.y,
      this.z + otherVector.z
    );
  }

  subtract(otherVector: Vector): Vector {
    return new Vector(
      this.x - otherVector.x,
      this.y - otherVector.y,
      this.z - otherVector.z
    );
  }

  rotate(axis: string, radians: number): Vector {
    this.updateMatrix();
    let rotationMatrix = VectorRotationMatrix3D(axis, radians)
    let outputMatrix = dot(rotationMatrix, this.columnMatrix())
    this.matrix = outputMatrix
    this.updateValues()
    return this
  }

  getLength(): number {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
    );
  }

  unitLengthVector(): Vector {
    return new Vector(
      this.x / this.length,
      this.y / this.length,
      this.z / this.length
    );
  }

  dotProduct(otherVector: Vector) {
    return (
      this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z
    );
  }

  columnMatrix() {
    return [
      [this.x],
      [this.y],
      [this.z]
    ]
  }

  inverse() {
    return new Vector(-this.x, -this.y, -this.z)
  }

  toString(){
    return `Vector, x:${this.x}, y:${this.y}, z:${this.z}`
  }
}

function vectorCrossProduct(A: Vector, B: Vector) {
  return new Vector(
    A.y * B.z - A.z * B.y,
    A.z * B.x - A.x * B.z,
    A.x * B.y - A.y * B.x
  );
}

export { Vector, vectorCrossProduct };
