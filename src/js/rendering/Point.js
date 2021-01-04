import Vector from "./Vector";
import {
  RotationMatrix3D,
  TranslationMatrix3D,
  ScaleMatrix3D,
} from "./matrices/Transform";
import { dot } from "./matrices/Matrix";

class Point {
  constructor(x, y, z, w = 1) {
    this.matrix = [x, y, z, w];
    this.perspectiveSpaceMatrix = [x, y, z, w];
    this.logged = false
    this.updateValues();
    this.perspectiveSpace();
  }

  add(vector) {
    this.matrix = [this.x + vector.x, this.y + vector.y, this.z + vector.z, 1];
    this.updateValues();
  }

  rotate(axis, degree) {
    let rotationMatrix = RotationMatrix3D(axis, degree);
    let outputMatrix = dot(this.getMatrix(), rotationMatrix)[0];
    this.matrix = outputMatrix;
    this.updateValues();
  }

  translate(x, y, z) {
    let translationMatrix = TranslationMatrix3D(x, y, z);
    let outputMatrix = dot(this.getMatrix(), translationMatrix)[0];
    this.matrix = outputMatrix;
    this.updateValues();
  }

  scale(x, y, z) {
    let scaleMatrix = ScaleMatrix3D(x, y, z);
    let outputMatrix = dot(this.getMatrix(), scaleMatrix)[0];
    this.matrix = outputMatrix;
    this.updateValues();
  }

  getVectorTo(pointB) {
    return new Vector(this.x - pointB.x, this.y - pointB.y, this.z - pointB.z);
  }

  getMatrix() {
    return [this.matrix];
  }

  columnVector() {
    return [[this.x], [this.y], [this.z], [this.w]];
  }

  perspectiveSpace() {
    this.perspectiveSpaceMatrix = [
      this.x / this.w,
      this.y / this.w,
      this.z / this.w,
      this.w / this.w,
    ];
    this.screenSpaceX = this.perspectiveSpaceMatrix[0];
    this.screenSpaceY = this.perspectiveSpaceMatrix[1];
  }

  orthographicSpace() {
    this.screenSpaceX = this.x;
    this.screenSpaceY = this.y;
  }

  vectorToPoint(otherPoint) {
    return new Vector(
      this.x - otherPoint.x,
      this.y - otherPoint.y,
      this.z - otherPoint.z
    );
  }

  updateValues() {
    this.x = this.matrix[0];
    this.y = this.matrix[1];
    this.z = this.matrix[2];
    this.w = this.matrix[3];
  }

  copy() {
    return new Point(this.x, this.y, this.z, this.w);
  }
}

export { Point };
