import { CollisionBox } from "../../../../engine/objects/primitives/CollisionBox";
import { CuboidMesh } from "../../../../engine/objects/primitives/Cuboid";
import WorldObject from "../../../../engine/objects/WorldObject";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { Color } from "../../../../tools/Colors";

const BLOCKER_COLOR = new Color(200, 10, 50, 0.8)
const BLOCKER_SCALE = new Vector(1, 1, 0.25)


class Blocker extends WorldObject{

    constructor(location, parent){
        super(location, parent, "blocker")
        this.mesh = new CuboidMesh(
            this, 
            parent.camera,
            {
                scale: BLOCKER_SCALE,
                color: BLOCKER_COLOR
            }
        )
        this.collisionBox = new CollisionBox(this, parent.camera, { scale: BLOCKER_SCALE, isVisible: true})
    }

    drawPerspective(ctx, camera){
        this.mesh.sortTrianglesByDepth()
        this.mesh.draw(ctx, camera)
        this.done = true;
    }
    
}

export { Blocker }