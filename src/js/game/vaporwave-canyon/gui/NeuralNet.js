import { createContext } from "react"
import { Vector2D } from "../../../engine/rendering/objects/primitives/Vector2D"
import { Color } from "../../../tools/Colors"

class NeuralNet{

  constructor({nCols, nRows, spacing, xPos, yPos}){
    this.dots = []

    for(let y = 0; y < nCols; y++){
      let row = []
      for(let x = 0; x < nRows; x++){
        row.push(new Vector2D(xPos + y * spacing, yPos + x * spacing ))
      }
      this.dots.push(row)
    }
    this.strokeColor = new Color(230, 230, 230)
  }

  draw(canvas){
    for(let y = 0; y < this.dots.length; y++){
      for(let x = 0; x < this.dots[y].length; x++){
            
        canvas.fillStyle = Color.WHITE.copy().toHtmlRgba()
        if (y < this.dots.length - 1){

          canvas.strokeStyle = this.strokeColor.toHtmlRgba()
          canvas.lineWidth = 1.5
          for(let i = 0; i < this.dots[y + 1].length; i++){
            canvas.beginPath()
            canvas.moveTo(this.dots[y][x].x, this.dots[y][x].y)
            canvas.lineTo(this.dots[y+1][i].x, this.dots[y + 1][i].y)
            canvas.stroke()
            canvas.closePath()
          }
        }
        canvas.beginPath()
        canvas.arc(this.dots[y][x].x, this.dots[y][x].y, 6, 0, 2*Math.PI)
        canvas.fill()
        canvas.closePath()
        
      }
    }
  }
}

export { NeuralNet }