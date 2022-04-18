import { Color } from "../../../tools/Colors"

class Shader{

    
    static draw(){
        return
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

    static drawWireframe(canvas, triangles, vertices, color=Color.LIGHTGREY, strokeSize=1){
        //TODO
    }
}

export { Shader }