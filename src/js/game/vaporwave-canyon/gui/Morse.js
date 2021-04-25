import { Vector2D } from "../../../engine/physics/vector/Vector2D"

class Morse{

  constructor(ditDahList, spacing, leadLength, trailLength, xPos, yPos){
    this.pointPairs = []
    this.pointPairs.push(
      [
        new Vector2D(xPos, yPos),
        new Vector2D(xPos, yPos - leadLength),
      ]
    )
    let totalDistance = leadLength
    for(let i = 0; i < ditDahList.length; i++){
      let length = spacing 
      let xOffset = 0
      let isSpace = false
      let char = ditDahList.charAt(i)
      if (char == "-"){
        length = spacing
      } else if(char == "."){
        length = spacing * 0.2
      } else if(char == "/"){
        xOffset = spacing * 0.8
        length = spacing * 0.4
      } else {
        isSpace = true
      }

      if (!isSpace){
        this.pointPairs.push(
          [
            new Vector2D(xPos - xOffset, yPos - totalDistance - spacing),
            new Vector2D(xPos + xOffset, yPos - totalDistance - spacing - length)
          ]
        )
      }
      totalDistance += length + spacing
    }
    this.pointPairs.push(
      [
        new Vector2D(xPos, yPos - totalDistance - spacing),
        new Vector2D(xPos, yPos - totalDistance - spacing - trailLength),
      ]
    )
    totalDistance += trailLength + spacing
    this.pointPairs.push(
      [
        new Vector2D(xPos, yPos - totalDistance),
        new Vector2D(xPos - spacing * 0.8, yPos - totalDistance - spacing)
      ],
      [
        new Vector2D(xPos, yPos - totalDistance),
        new Vector2D(xPos + spacing * 0.8, yPos - totalDistance - spacing)
      ]
    )
  }

  draw(canvas){
    canvas.lineCap = "round"
    this.pointPairs.forEach(pair =>{
      canvas.beginPath()
      canvas.moveTo(pair[0].x, pair[0].y)
      canvas.lineTo(pair[1].x, pair[1].y)
      canvas.stroke()
    })
  }
}

export { Morse }