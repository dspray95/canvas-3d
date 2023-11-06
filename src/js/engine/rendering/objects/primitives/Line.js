import { version } from "react"
import { Color } from "../../../../tools/Colors"

export default class Line{

  constructor(startPoint, endPoint, color=Color.RED, lineWidth=1){
    this.startPoint = startPoint
    this.endPoint = endPoint
    this.color = color
    this.lineWidth = lineWidth
  }

  translate(vector){
    this.startPoint.add(vector)
    this.endPoint.add(vector)
  }

  drawPerspective(canvas, camera){
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

export { Line }