import { CuboidMesh } from "../../../../engine/objects/primitives/Cuboid";
import WorldObject from "../../../../engine/objects/WorldObject";
import Mesh from "../../../../engine/rendering/objects/mesh/Mesh";
import { MeshData } from "../../../../engine/rendering/objects/mesh/MeshData";
import Point from "../../../../engine/rendering/objects/primitives/Point";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { FlatShader } from "../../../../engine/rendering/shader/FlatShader";
import { Color } from "../../../../tools/Colors";

class Blocker extends WorldObject{
    constructor(location, parent){
        super(location, parent, "blocker")
        this.mesh = new CuboidMesh(
            this, 
            parent.camera,
            {
                scale: new Vector(1, 1, 0.25), 
                color: new Color(200, 10, 50, 0.8)
            }
        )
        this.collisionBox = this.mesh
    }
   
    drawPerspective(ctx, camera){
        this.mesh.sortTrianglesByDepth()
        this.mesh.draw(ctx, camera)
        // FlatShader.drawWireframe(ctx, this.mesh.triangles, Color.RED)
        this.done = true;
    }
}

export { Blocker }