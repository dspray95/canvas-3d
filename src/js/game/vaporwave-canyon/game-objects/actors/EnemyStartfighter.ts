import { TupleType } from "typescript";
import { Collision } from "../../../../engine/physics/collision/Collision";
import Point from "../../../../engine/rendering/objects/primitives/Point";
import { Color } from "../../../../tools/Colors";
import { Shootable } from "../interface/Shootable";
import { Starfighter } from "./Starfighter";
import { Worldspace } from "../../../../engine/Worldspace";
import { Logger } from "../../../../engine/logging/logger";
import { Camera } from "../../../../engine/rendering/Camera";

const logger = Logger.logger;

class EnemyStarfighter extends Starfighter implements Shootable {
    
    bounds: Bounds;

    constructor(location: Point, parent: Worldspace){
        super(location, parent, parent.camera, Color.RED, "enemy-starfighter")
        this.rotate("y", 180, this.getWorldspace().origin);
        this.mesh.scale(0.5, 0.8, 1);
        this.bounds = this.setMinAndMaxPositions();
    }

    isShot(point: Point): boolean {
        if(Collision.pointCollides2D(
            point.x,
            point.z,
            this.bounds.minX,
            this.bounds.maxX,
            this.bounds.minZ,
            this.bounds.maxZ
        )){
            logger.log("HIT", "ENEMY_GROUP_1")
            this.destroy(); 
            return true
        }
    
        return false
    }

    setMinAndMaxPositions(): Bounds{
        let bounds: Bounds = {
            minX: Number.MAX_VALUE,
            maxX: Number.MIN_VALUE,
            minZ: Number.MAX_VALUE,
            maxZ: Number.MIN_VALUE
        }

        this.mesh.vertices.forEach(vertex => {
            if (vertex.x < bounds.minX){
                bounds.minX = vertex.x
            } else if (vertex.x > bounds.maxX){
                bounds.maxX = vertex.x
            }
            if(vertex.z < bounds.minZ){
                bounds.minZ = vertex.z;
            } else if (vertex.z > bounds.maxZ){
                bounds.maxZ = vertex.z;
            }
        })

        return bounds;
    }

    destroy(){
        let container = this.getWorldspace().objects.mobs;
        const index = container.indexOf(this);
        container.splice(index, 1);
    }

    tick(){
        this.scripts.forEach(behaviourScript => {
            behaviourScript.execute();
        })
    }

    drawPerspective(ctx: any, camera: any) {
        this.mesh.draw(ctx, camera)
        this.drawBounds(ctx, camera)
        this.done = true;
        
    }
    drawBounds(ctx: any, camera: Camera){
        let pointsToProject: Array<Point> = [
            new Point(this.bounds.minX, this.location.y, this.bounds.minZ),
            new Point(this.bounds.minX, this.location.y, this.bounds.maxZ),
            new Point(this.bounds.maxX, this.location.y, this.bounds.minZ),
            new Point(this.bounds.maxX, this.location.y, this.bounds.maxZ)
        ]
        ctx.fillStyle = Color.YELLOW.toHtmlRgba()

        pointsToProject.forEach(point => {
            camera.perspectivePointProjectionPipeline(point);
            ctx.fillRect(
                point.screenSpaceX - Math.floor(2.5),
                point.screenSpaceY  - Math.floor(2.5),
                5, 
                5
            )
        })
    }
}

interface Bounds {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
}
   


export { EnemyStarfighter }