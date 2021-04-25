import { Vector2D } from "../../../engine/physics/vector/Vector2D"
import { Color } from "../../../tools/Colors"

class ZigZag{

  constructor(nZigs, zigDistance, zagHeight, xPos, yPos, alignment){
    let points = []
    let totalX = 0
  
    for(let i = 0; i < nZigs; i++){
      let zigXPos = 0
      if(alignment = "left"){
        zigXPos = totalX + zigDistance + xPos
      }
      else {
        zigXPos = xPos - totalX - zigDistance
      }
      
      let zigYPos = i % 2 == 0 ? zagHeight + yPos : yPos
      totalX -= zigDistance
      points.push(new Vector2D(zigXPos, zigYPos))
    }
    
    this.points = points
  }

  draw(canvas){
    canvas.beginPath()
    canvas.moveTo(this.points[0].x, this.points[0].y)
    for(let i = 1; i < this.points.length; i++){
      canvas.lineTo(this.points[i].x, this.points[i].y)
    }
    
    canvas.strokeStyle = Color.WHITE.toHtmlRgba()
    canvas.lineWidth = 3
    canvas.stroke()
  }

}

export { ZigZag }