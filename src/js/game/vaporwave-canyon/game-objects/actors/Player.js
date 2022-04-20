import { toHaveStyle } from "@testing-library/jest-dom"
import { Logger } from "../../../../engine/logging/logger"
import WorldObject from "../../../../engine/objects/WorldObject"
import LightSource from "../../../../engine/rendering/objects/light/LightSource"
import Mesh from "../../../../engine/rendering/objects/mesh/Mesh"
import Point from "../../../../engine/rendering/objects/primitives/Point"
import { FlatShader } from "../../../../engine/rendering/shader/FlatShader"
import { Color } from "../../../../tools/Colors"

class Player extends WorldObject{
    
    constructor(location, parent){
        super(location, parent, "Player")
        let [points, tris] = Player.genPlayerMesh()
        let color = Color.ELECTRIC_BLUE.copy()
        // color.opacity = 0.8
        this.mesh = new Mesh(
            this, 
            parent.camera,
            points,
            tris,
            true,
            false, 
            false,
            FlatShader,
            color,
            Color.PINK.copy(),
        )
        
        this.colorOverride(new Color(55, 55, 55))
        this.mesh.bakeLighting(
            new LightSource(new Point(-2, -1, 2), Color.WHITE.copy(), 1, "point"),
            parent.camera.location    
        )
    }

    colorOverride(windowColor){
        /**Get some cool tinted windows bro B) 
        *   tri index 7 and 2
        **/
        this.mesh.triangles[7].color = windowColor
        this.mesh.triangles[2].color = windowColor      
    }

    static genPlayerMesh(){
        let points = [
            new Point(0, 0, 0.4),
            new Point(-0.05, 0, 0.3),
            new Point(0, -0.02, 0.3),
            new Point(-0.04, -0.02, 0.1),
            new Point(0, -0.05, 0.15),
            new Point(0, 0, 0.05),
            new Point(-0.15, 0, 0),
            new Point(0.05, 0, 0.3),
            new Point(0.15, 0, 0),
            new Point(0.04, -0.02, 0.1),

        ]

        let triangles = [   
            [0, 1, 2],
            [2, 1, 3],
            [2, 3, 4],
            [4, 3, 5],
            [1, 6, 3],
            [7, 0, 2],
            [7, 2, 9],
            [2, 4, 9],
            [5, 3, 6],
            [9, 4, 5],
            [8, 9, 5],
            [8, 7, 9]
        ]

        return [points, triangles]
    }

    drawPerspective(ctx, camera){
        this.mesh.draw(ctx, camera)
        // this.mesh.points.forEach(point => {
        //     camera.perspectivePointProjectionPipeline(point)
        // })
        this.done = true;
    }
}

export { Player }