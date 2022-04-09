import { Logger } from "../../../../engine/logging/logger"
import WorldObject from "../../../../engine/objects/WorldObject"
import LightSource from "../../../../engine/rendering/objects/light/LightSource"
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
            Color.YELLOW.copy(),
            Color.PINK.copy()
        )
        this.mesh.bakeLighting(
            new LightSource(new Point(10, 10, 10), Color.WHITE.copy(), 1, "point"),
            parent.camera.location    
        )
    }

    static genPlayerMesh(){
        let points = [
            //Left side
            //wing top
            new Point(-0.25, 0.3, 0),
            new Point(0, 0.3, 0.15),
            new Point(0, 0.29, 0),
            //wing back
            new Point(-0.25, 0.3, 0),
            new Point(0, 0.3, -0.02),
            new Point(0, 0.29, 0),
            //Right side
            //wing top
            new Point(0.25, 0.3, 0),
            new Point(0, 0.3, 0.15),
            new Point(0, 0.29, 0)
        ]

        let triangles = [   
            [2, 1, 0],
            [3, 4, 5],
            [6, 7, 8]
        ]

        return [points, triangles]
    }

    static genPlayerCubeMesh(){
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