import { Color } from "../../../../tools/Colors"
import { Camera } from "../../Camera"
import Point from "./Point"
import Vector from "./Vector";

export default class Line{

  startPoint: Point;
  endPoint: Point;
  color: Color;
  lineWidth: number;
  isVisible: boolean;

  constructor(startPoint: Point, endPoint: Point, color: Color=Color.RED, lineWidth: number=1){
    this.startPoint = startPoint
    this.endPoint = endPoint
    this.color = color
    this.lineWidth = lineWidth
    this.isVisible = true
  }

  translate(vector: Vector){
    this.startPoint.add(vector)
    this.endPoint.add(vector)
  }

  drawPerspective(canvas: any, camera: Camera){
    if(this.isVisible){
      camera.perspectivePointProjectionPipeline(this.startPoint)
      camera.perspectivePointProjectionPipeline(this.endPoint)

      canvas.strokeStyle = this.color.toHtmlRgba()
      canvas.lineWidth = this.lineWidth

      canvas.beginPath()
      canvas.moveTo(this.startPoint.screenSpaceX, this.startPoint.screenSpaceY)
      canvas.lineTo(this.endPoint.screenSpaceX, this.endPoint.screenSpaceY)
      canvas.stroke()
    }  
  }
}

export { Line }