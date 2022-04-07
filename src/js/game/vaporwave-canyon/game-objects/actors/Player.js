import { Logger } from "../../../../engine/logging/logger"
import WorldObject from "../../../../engine/objects/WorldObject"
import Mesh from "../../../../engine/rendering/objects/mesh/Mesh"
import Point from "../../../../engine/rendering/objects/primitives/Point"
import { FlatShading } from "../../../../engine/rendering/shader/FlatShading"
import { Color } from "../../../../tools/Colors"

class Player extends WorldObject{
    
    constructor(ocation, parent){
        super(ocation, parent, "Player")
        let [points, tris] = Player.genPlayerMesh()
        this.mesh = new Mesh(
            this, 
            parent.camera,
            points,
            tris,
            true,
            false, 
            false,
            FlatShading,
            Color.YELLOW
        )
        
    }

    static genPlayerMesh(){
        let xOffset = 1 * 0.5
        let yOffset = 1 * 0.5
        let zOffset = 1 * 0.5
    
        let botLeft = new Point(-xOffset, -yOffset, -zOffset)
        let botRight = new Point(xOffset, -yOffset, -zOffset)
        let botLeftBack = new Point(-xOffset, -yOffset, zOffset)
        let botRightBack = new Point(xOffset, -yOffset, zOffset)
        let topLeft = new Point(-xOffset, yOffset, -zOffset)
        let topRight = new Point(xOffset, yOffset, -zOffset)
        let topLeftBack = new Point(-xOffset, yOffset, zOffset)
        let topRightBack = new Point(xOffset, yOffset, zOffset)
    
        let points = [
          topLeft,
          topRight,
          topRightBack,
          topLeftBack,
          botLeft,
          botRight,
          botRightBack,
          botLeftBack,
        ]

        let triangles = [
            //Bottom
            [1, 0, 2],
            [0, 3, 2],
            //Front
            [0, 1, 4],
            [1, 5, 4],
            //Right
            [1, 2, 6],
            [1, 6, 5],
            //Left
            [0, 7, 3],
            [0, 4, 7],
            //Top
            [4, 5, 6],
            [4, 6, 7],
            //Back
            [2, 3, 7],
            [2, 7, 6]
          ]

        return [points, triangles]
    }

    drawPerspective(ctx, camera){
        this.mesh.draw(ctx, camera)
        FlatShading.drawVetices(ctx, this.mesh.points)
        this.done = true;
    }
}

export { Player }