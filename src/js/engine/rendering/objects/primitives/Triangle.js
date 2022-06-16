
import { Color } from "../../../../tools/Colors";
import Point, { averagePoint } from "./Point";
import Vector from "./Vector";

export default class Triangle{

  /**
   * 
   * @param {Point} A 
   * @param {Point} B 
   * @param {Point} C 
   * @param {Color} color 
   */
  constructor(A, B, C, color=null, strokeSyle=null){
    this.A = A
    this.B = B
    this.C = C

    this.planeCentre = this.calculatePlaneCenter()
    if(color === null){
      this.setColor(Color.WHITE.copy())
    }
    else{
      this.setColor(color)
    }
    
    if(strokeSyle === null){
      this.wireframeColor = this.fillColor
    }
    else {
      this.wireframeColor = strokeSyle
    }
  }

  calculatePlaneCenter(){
    return averagePoint(this.pointsAsList())
  }

  pointsAsList(){
    return [this.A, this.B, this.C]
  }

  sortClockwise(a, b){
    let centre = this.planeCentre

    if (a.screenSpaceX - centre.screenSpaceX >= 0 && b.screenSpaceX - centre.screenSpaceX < 0) return true;

    if (a.screenSpaceX - centre.screenSpaceX < 0 && b.screenSpaceX - centre.screenSpaceX >= 0) return false;

    if (a.screenSpaceX - centre.screenSpaceX === 0 && b.screenSpaceX - centre.screenSpaceX === 0) {
      if (a.screenSpaceY - centre.screenSpaceY >= 0 || b.screenSpaceY - centre.screenSpaceY >= 0)
          return a.screenSpaceY > b.screenSpaceY;
      return b.screenSpaceY > a.screenSpaceY;
    }

    // compute the cross product of vectors (center -> a) x (center -> b)
    const det = (a.screenSpaceX - centre.screenSpaceX) * (b.screenSpaceY - centre.screenSpaceY) - (b.screenSpaceX - centre.screenSpaceX) * (a.screenSpaceY - centre.screenSpaceY);
    if (det < 0)
        return true;
    if (det > 0)
        return false;

    // points a and b are on the same line from the center
    // check which point is closer to the center
    const d1 = (a.screenSpaceX - centre.screenSpaceX) * (a.screenSpaceX - centre.screenSpaceX) + (a.screenSpaceY - centre.screenSpaceY) * (a.screenSpaceY - centre.screenSpaceY);
    const d2 = (b.screenSpaceX - centre.screenSpaceX) * (b.screenSpaceX - centre.screenSpaceX) + (b.screenSpaceY - centre.screenSpaceY) * (b.screenSpaceY - centre.screenSpaceY);
    return d1 > d2;
  }

  sortPoints(){
   let points = [this.A, this.B, this.C]
   points.sort(this.sortClockwise)
   this.A = points[0] 
   this.B = points[1]
   this.C = points[3]  
  }

  calculateNormal(){
    let bSubA = new Point(
      this.B.x - this.A.x,
      this.B.y - this.A.y,
      this.B.z - this.A.z
    )
    let cSubA = new Point(
      this.C.x - this.A.x,
      this.C.y - this.A.y,
      this.C.z - this.A.z
    )
    // let bSubA = new Point(this.B.inPerspectiveSpace.x - this.A.inPerspectiveSpace.x, this.B.inPerspectiveSpace.y - this.A.inPerspectiveSpace.y, this.B.inPerspectiveSpace.z - this.A.inPerspectiveSpace.z)
    // let cSubA = new Point(this.C.inPerspectiveSpace.x - this.A.inPerspectiveSpace.x, this.C.inPerspectiveSpace.y - this.A.inPerspectiveSpace.y, this.C.inPerspectiveSpace.z - this.A.inPerspectiveSpace.z)
    let normalX = bSubA.y * cSubA.z - bSubA.z * cSubA.y
    let normalY = bSubA.z * cSubA.x - bSubA.x * cSubA.z
    let normalZ = bSubA.x * cSubA.y - bSubA.y * cSubA.x
    this.normal = new Vector(normalX, normalY, normalZ)
    this.normal = this.normal.unitLengthVector()
  }

  setColor(color){
    this.color = color
    this.fillColor = this.color.toHtmlRgba()
  }
  
  setOpacity(opacity){
    this.color.opacity = opacity
    this.fillColor = this.color.toHtmlRgba()
  }
  
  toString(){
    return `Triangle, 
      \tPoints\t${this.A.toString()}, \n\t\t${this.B.toString()}, \n\t\t${this.C.toString()}
      \tplane centre at: ${this.planeCentre.toString()}
      \tnormal vector of: ${this.normal.toString()}
      \tcolor: ${this.color.toHtmlRgba()}
    `

            
  }
}