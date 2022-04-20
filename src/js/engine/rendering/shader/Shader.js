import { createContext } from "react"
import { Color } from "../../../tools/Colors"

class Shader{

    
    static draw(){
        return
    }

    static drawVetices(canvas, vertices, color=Color.YELLOW, size=5, writeVertIndex=false, textColor=Color.WHITE){
        for(let i = 0; i < vertices.length; i++){
            let vert = vertices[i]
            canvas.fillStyle = color.toHtmlRgba()
            canvas.fillRect(
                vert.screenSpaceX - Math.floor(size / 2),
                 vert.screenSpaceY  - Math.floor(size / 2),
                 size, 
                 size
            )
            if(writeVertIndex){
                canvas.font = "15px Arial"
                canvas.fillStyle = textColor.toHtmlRgba()
                canvas.textAlign = "center"
                canvas.fillText(i, vert.screenSpaceX, vert.screenSpaceY)
            }
        }
    }

    static drawWireframe(canvas, triangles, color=Color.LIGHTGREY, strokeSize=1){
        for(let i = 0; i < triangles.length; i++){
            canvas.strokeStyle = color.toHtmlRgba()
            canvas.lineWidth = strokeSize
            canvas.moveTo(triangles[i].A.screenSpaceX, triangles[i].A.screenSpaceY)
            canvas.lineTo(triangles[i].B.screenSpaceX, triangles[i].B.screenSpaceY)
            canvas.lineTo(triangles[i].C.screenSpaceX, triangles[i].C.screenSpaceY)
            canvas.lineTo(triangles[i].A.screenSpaceX, triangles[i].A.screenSpaceY)
            canvas.stroke()
        }
    }
}

export { Shader }