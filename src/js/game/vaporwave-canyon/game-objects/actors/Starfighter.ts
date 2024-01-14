import WorldObject from "../../../../engine/objects/WorldObject"
import LightSource from "../../../../engine/rendering/objects/light/LightSource"
import { Mesh } from "../../../../engine/rendering/objects/mesh/Mesh"
import { MeshData } from "../../../../engine/rendering/objects/mesh/MeshData"
import Point from "../../../../engine/rendering/objects/primitives/Point"
import { Color } from "../../../../tools/Colors"
import Vector from "../../../../engine/rendering/objects/primitives/Vector"
import { Camera } from "../../../../engine/rendering/Camera"
import { Worldspace } from "../../../../engine/Worldspace"
import { FlatShader } from "../../../../engine/rendering/shader/FlatShader"
import { StarfighterHover } from "../../scripts/movement/StarfighterHover"

class Starfighter extends WorldObject{
    
    mesh: Mesh;

    constructor(
        location: Point,
        parent: WorldObject | Worldspace, 
        camera: Camera, //Used for creating the mesh
        color: Color =Color.GREY, 
        name: string="starfighter"
    ){
        super(location, parent, name)
        let meshData = Starfighter.genMeshData()
        this.mesh = new Mesh(
            this, 
            camera,
            meshData,
            {
                doDrawCall: true,
                shader: new FlatShader(),
                color: color.copy()
            }
        )
        this.colorOverride(new Color(55, 55, 55))
        this.mesh.bakeLighting(
            new LightSource(new Point(-2, -1, 2), Color.WHITE.copy()),
            camera.location
        )
        this.mesh.scale(2, 4, 2);
        this.scripts.push(new StarfighterHover(this))
    }

    colorOverride(windowColor: Color){
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

    drawPerspective(ctx: any, camera: Camera){
        this.mesh.sortTrianglesByDepth()
        this.mesh.draw(ctx, camera)
        this.done = true;
    }

}

export { Starfighter }