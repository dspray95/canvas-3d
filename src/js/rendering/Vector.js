export default class Vector {
  constructor(x, y, z) {
    this.matrix = [x, y, z];
    this.x = x;
    this.y = y;
    this.z = z;
    this.length = this.getLength();
  }

  scale(scalar) {
    return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  add(otherVector) {
    return new Vector(
      this.x + otherVector.x,
      this.y + otherVector.y,
      this.z + otherVector.z
    );
  }

  subtract(otherVector) {
    return new Vector(
      this.x - otherVector.x,
      this.y - otherVector.y,
      this.z - otherVector.z
    );
  }

  getLength() {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
    );
  }

  unitLengthVector() {
    return new Vector(
      this.x / this.length,
      this.y / this.length,
      this.z / this.length
    );
  }

  viewingDirectionVector() {
    return new Vector(this.x, this.y, 1);
  }

  dotProduct(otherVector) {
    return (
      this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z
    );
  }

  crossProduct(otherVector) {}
}

function vectorCrossProduct(A, B) {
  return new Vector(
    A.y * B.z - A.z * B.y,
    A.z * B.x - A.x * B.z,
    A.x * B.y - A.y * B.x
  );
}

export { Vector, vectorCrossProduct };
