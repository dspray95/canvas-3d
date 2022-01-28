import Vector from "./Vector";
import {
  RotationMatrix3D,
  TranslationMatrix3D,
  ScaleMatrix3D,
} from "../../matrices/Transform";
import { dot } from "../../matrices/Matrix";
import { randomRange } from "../../../../tools/Random";

class Point {
  constructor(x, y, z, w=1, parent=null) {
    this.setMatrix(x, y, z, w)
    this.logged = false
    this.parent=parent
    this.inPerspectiveSpace = null
    this.lightAmount=1
    this.updateValues()
    this.drawCalls = 0
  }

  add(vector) {
    this.setMatrix(this.x + vector.x, this.y + vector.y, this.z + vector.z, 1);
    this.updateValues()
  }

  subtract(vector) {
    this.setMatrix(this.x - vector.x, this.y - vector.y, this.z - vector.z, 1)
    this.updateValues()
  }

  divideByW(){
    this.setMatrix(this.x/this.w, this.y/this.w, this.z/this.w, this.w)
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

  setMatrixFromList(matrixAsList){
    this.matrix = matrixAsList
    this.updateValues()
  }

  asList(){
    return [this.x, this.y, this.z, this.w]
  }

  orthographicSpace() {
    this.screenSpaceX = this.x;
    this.screenSpaceY = this.y;
  }

  
  distanceTo(other){
    return Math.sqrt(
      Math.pow(this.x - other.x, 2) + 
      Math.pow(this.y - other.y, 2) + 
      Math.pow(this.z - other.z, 2)
    )
  }

  /**
   * Must be called after modifying the point's location matrix 
   * without modifying the location variables
   */
  updateValues() {
    this.x = this.matrix[0][0];
    this.y = this.matrix[1][0];
    this.z = this.matrix[2][0];
    this.w = this.matrix[3][0];
  }

  /**
   * Must be called after modifying the point's location variables 
   * without modifying the location matrix
   */
  updateMatrix() {
    this.matrix = [[this.x], [this.y], [this.z], [this.w]]
  }

  copy() {
    return new Point(this.x, this.y, this.z, this.w);
  }

  static averagePoint(points, inPerspectiveSpace=false){
    let totalX = 0
    let totalY = 0
    let totalZ = 0
    let totalW = 0
    let totalScreenSpaceX = 0
    let totalScreenSpaceY = 0
    points.forEach((point) => {
      totalScreenSpaceX += point.screenSpaceX
      totalScreenSpaceY += point.screenSpaceY

      if(inPerspectiveSpace){
        point = point.inPerspectiveSpace
      }
      totalX += point.x
      totalY += point.y
      totalZ += point.z
      totalW += point.w
    })
    let avgX = totalX / points.length
    let avgY = totalY / points.length
    let avgZ = totalZ / points.length
    let avgW = totalW / points.length
    let avgSSX = totalScreenSpaceX / points.length
    let avgSSY = totalScreenSpaceY / points.length

    let avgPoint = new Point(avgX, avgY, avgZ, avgW)
    avgPoint.screenSpaceX = avgSSX
    avgPoint.screenSpaceY = avgSSY
    return avgPoint
  }

  static averageDimension(points, dimension, perspectiveSpace){
    let total = 0
    points.forEach((point) => {
      if(perspectiveSpace){
        point = point.inPerspectiveSpace
      }
      if (dimension == "x"){
        total += point.x
      }
      else if (dimension == "y"){
        total += point.y
      }
      else if (dimension == "z"){
        total += point.z
      }
      else if (dimension == "w"){
        total += point.w
      }
      else{
        throw new Error("Invalid dimension in Point.average()")
      }
    })
    return total / points.length
  }
}

export const averageDimension = Point.averageDimension;
export const averagePoint = Point.averagePoint
export default Point