import { Vector2D } from "../../../engine/rendering/objects/primitives/Vector2D"

class Fretboard {

  constructor({height, xPos, yPos, fretSpacing=20}){
    this.pointPairs = []
    let totalY = 0
    let totalX = 0
    for (let i = 0; i <= 5; i++){
      this.pointPairs.push(
        [
          new Vector2D(xPos + totalX, yPos),
          new Vector2D(xPos + totalX, height)
        ]
      )
      totalX += fretSpacing
      totalY += height
    }
    this.circlePoints = []
    this.circlePoints.push(new Vector2D(xPos + fretSpacing * 1.5, yPos + height * 0.5))
    this.circlePoints.push(new Vector2D(xPos + fretSpacing * 3.5, yPos + height * 0.5))

  }

  draw(canvas){
    canvas.lineCap = "round"
    canvas.strokeStyle = "rgb(255, 255, 255)"
    canvas.fillStyle = "rgb(255, 255, 255)"

    this.pointPairs.forEach(pair =>{
      canvas.beginPath()
      canvas.moveTo(pair[0].x, pair[0].y)
      canvas.lineTo(pair[1].x, pair[1].y)
      canvas.stroke()
    })
    this.circlePoints.forEach(point => {
      canvas.beginPath()
      canvas.arc(point.x, point.y, 3, 0, 2*Math.PI)
      canvas.fill()
      canvas.closePath()
    })
  }
}

export { Fretboard }