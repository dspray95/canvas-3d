import { Color } from "../../../tools/Colors"

class Shader{

    
    static draw(){
        return
    }
    
    static drawVertLabels(canvas, vertices, mapWidth, terrainName, terrainColor){
        canvas.fillStyle = "white"
        canvas.font = "10px Arial"
        for(let i = 0; i < mapWidth; i++){
            canvas.fillText(i, vertices[i].screenSpaceX, vertices[i].screenSpaceY)
        }
        for(let i = vertices.length - mapWidth; i < vertices.length; i++){
            canvas.fillText(i, vertices[i].screenSpaceX, vertices[i].screenSpaceY)
        }
        canvas.fillStyle = terrainColor
        canvas.font = "40px Arial"
        let centerVert = vertices[Math.floor(vertices.length/2)]
        canvas.fillText(terrainName, centerVert.screenSpaceX, centerVert.screenSpaceY)
    }

    static drawVetices(canvas, vertices, color=Color.YELLOW, size=5){
        canvas.fillStyle = color.toHtmlRgba()
        vertices.forEach(vert => {
            canvas.fillRect(
                vert.screenSpaceX - Math.floor(size / 2),
                 vert.screenSpaceY  - Math.floor(size / 2),
                 size, 
                 size
            )
        });
    }

}

export { Shader }