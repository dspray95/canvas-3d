import { Vector2D } from "../../../engine/rendering/objects/primitives/Vector2D"
import { Color } from "../../../tools/Colors"

class Mountains{

  constructor({nPeaks, slopeDistance, peakHeight, xPos, yPos, alignment}){
    let points = []
    let totalX = 0
  
    for(let i = 0; i < nPeaks; i++){
      let peakXPos = 0
      if(alignment = "left"){
        peakXPos = totalX + slopeDistance + xPos
      }
      else {
        peakXPos = xPos - totalX - slopeDistance
      }
      
      let peakYPos = i % 2 == 0 ? peakHeight + yPos : yPos
      totalX -= slopeDistance
      points.push(new Vector2D(peakXPos, peakYPos))
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

export { Mountains }