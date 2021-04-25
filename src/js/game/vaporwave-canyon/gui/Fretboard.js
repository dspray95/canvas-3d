import { Vector2D } from "../../../engine/physics/vector/Vector2D"

class Fretboard{

  constructor(width, height, xPos, yPos){
    this.pointPairs = []
    let totalY = 0
    for (let i = 0; i <= 5; i++){
      this.pointPairs.push(
        [new Vector2D(xPos + height + totalY, yPos ),
        new Vector2D(xPos + height + totalY, yPos + width)]
      )
      totalY += height
    }
    this.circlePoints = []
    this.circlePoints.push(new Vector2D(xPos + height * 2.5 , yPos + width / 2))
    this.circlePoints.push(new Vector2D(xPos + height * 4.5, yPos + width / 2))

  }

  draw(canvas){
    canvas.lineCap = "round"
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