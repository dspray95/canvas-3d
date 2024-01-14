import { Logger } from "../../../../engine/logging/logger";
import { CollisionBox } from "../../../../engine/objects/primitives/CollisionBox";
import { CuboidMesh } from "../../../../engine/objects/primitives/Cuboid";
import WorldObject from "../../../../engine/objects/WorldObject";
import { Collision } from "../../../../engine/physics/collision/Collision";
import Point from "../../../../engine/rendering/objects/primitives/Point";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { Color } from "../../../../tools/Colors";
import { Shootable } from "../interface/Shootable";

const BLOCKER_COLOR = Color.WHITE;
const BLOCKER_SCALE = new Vector(1, 1, 0.25)
const logger = Logger.logger;

class Blocker extends WorldObject implements Shootable{
    mesh: any;
    collisionBox: any;
    done: boolean;
    scale: Vector;

    constructor(location: any, parent: { camera: any; }){
        super(location, parent, "blocker");
        this.scale = BLOCKER_SCALE;
        this.mesh = new CuboidMesh(
            this, 
            parent.camera,
            {
                scale: BLOCKER_SCALE,
                color: BLOCKER_COLOR
            }
        );
        this.collisionBox = new CollisionBox(this, parent.camera, { scale: BLOCKER_SCALE, isVisible: true});
        this.done = false;
    }

    drawPerspective(ctx: any, camera: any){
        this.mesh.sortTrianglesByDepth();
        this.mesh.draw(ctx, camera);
        this.done = true;
    }

    isShot(point: Point): boolean {
        const hasCollided = Collision.pointCollides2D(
            point.x,
            point.z,
            this.location.x - this.scale.x * 0.5,
            this.location.x + this.scale.x * 0.5,
            this.location.z - this.scale.z * 0.5,
            this.location.z + this.scale.z * 0.5,
        )
        if(hasCollided){
            this.destroy();
        }
        return hasCollided;
    }

    destroy(){
        let container = this.getWorldspace().objects.mobs
        const index = container.indexOf(this)
        container.splice(index, 1)
    }
    
}

export { Blocker }