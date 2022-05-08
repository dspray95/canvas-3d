import WorldObject from "../../../../engine/objects/WorldObject"
import LightSource from "../../../../engine/rendering/objects/light/LightSource"
import { Mesh } from "../../../../engine/rendering/objects/mesh/Mesh"
import { MeshData } from "../../../../engine/rendering/objects/mesh/MeshData"
import Point from "../../../../engine/rendering/objects/primitives/Point"
import { Color } from "../../../../tools/Colors"
import { CollisionBox } from "../../../../engine/objects/primitives/CollisionBox"

class Starfighter extends WorldObject{
    
    constructor(location, parent, color=Color.GREY, name="starfighter"){
        super(location, parent, name)
        let meshData = Starfighter.genMeshData()
        // color.opacity = 0.8
        this.mesh = new Mesh(
            this, 
            parent.camera,
            meshData,
            {
                color: color.copy()
            }
        )
        this.colorOverride(new Color(55, 55, 55))
        this.mesh.bakeLighting(
            new LightSource(new Point(-2, -1, 2), Color.WHITE.copy()),
            parent.camera.location    
        )
        this.mesh.scale(2, 4, 2)
        this.collisionBox = new CollisionBox(this, parent.camera, { visible: true })
    }

    colorOverride(windowColor){
        /**Get some cool tinted windows bro B) 
        *   tri index 7 and 2
        **/
        this.mesh.triangles[7].color = windowColor
        this.mesh.triangles[2].color = windowColor      
    }

    static genMeshData(){
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

        return new MeshData(points, triangles)
    }

    drawPerspective(ctx, camera){
        this.mesh.sortTrianglesByDepth()
        this.mesh.draw(ctx, camera)
        this.done = true;
    }
}

export { Starfighter }