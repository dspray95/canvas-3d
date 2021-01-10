import Vector from "./Vector";
import {
  RotationMatrix3D,
  TranslationMatrix3D,
  ScaleMatrix3D,
} from "./matrices/Transform";
import { dot } from "./matrices/Matrix";

export default class Point {
  constructor(x, y, z, w=1, parent=null) {
    this.setMatrix(x, y, z, w)
    this.perspectiveSpaceMatrix = [x, y, z, w];
    this.logged = false
    this.parent=parent
    this.updateValues();
    this.perspectiveSpace();
  }

  add(vector) {
    this.setMatrix(this.x + vector.x, this.y + vector.y, this.z + vector.z, 1);
    this.updateValues();
  }

  rotate(axis, degree) {
    let rotationMatrix = RotationMatrix3D(axis, degree);
    let outputMatrix = dot(rotationMatrix, this.matrix);
    this.matrix = outputMatrix;
    this.updateValues();
  }

  translate(x, y, z) {
    let translationMatrix = TranslationMatrix3D(x, y, z);
    let outputMatrix = dot(translationMatrix, this.matrix);
    this.matrix = outputMatrix;
    this.updateValues();
  }

  scale(x, y, z) {
    let scaleMatrix = ScaleMatrix3D(x, y, z);
    let outputMatrix = dot(scaleMatrix, this.matrix);
    this.matrix = outputMatrix;
    this.updateValues();
  }

  getVectorTo(pointB) {
    return new Vector(pointB.x - this.x, 
                      pointB.y - this.y, 
                      pointB.z - this.z);
  }

  getMatrix() {
    return [[this.x], [this.y], [this.z], [this.w]];
  }

  setMatrix(x, y, z, w){
    this.matrix = [[x], [y], [z], [w]]
    this.updateValues()
  }

  asList(){
    return [this.x, this.y, this.z, this.w]
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

  updateValues() {
    this.x = this.matrix[0][0];
    this.y = this.matrix[1][0];
    this.z = this.matrix[2][0];
    this.w = this.matrix[3][0];
  }

  copy() {
    return new Point(this.x, this.y, this.z, this.w);
  }
}
