import { CONFIG } from "../../../../../config/config";
import { Worldspace } from "../../../../engine/Worldspace";
import { Logger } from "../../../../engine/logging/logger";
import { CollisionBox } from "../../../../engine/objects/primitives/CollisionBox";
import Point from "../../../../engine/rendering/objects/primitives/Point";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { Color } from "../../../../tools/Colors";
import { BehaviourScript } from "../../scripts/BehaviourScript";
import { PlayerDamageAnimation } from "../../scripts/animtation/PlayerDamageAnimation";
import { StarfighterHover } from "../../scripts/movement/StarfighterHover";
import { LaserBeam } from "./LaserBeam";
import { Starfighter } from "./Starfighter";

const logger = Logger.logger;

class Player extends Starfighter {

    health: number;
    damageAnimation: PlayerDamageAnimation;
    lastShotTime: number = 0;
    laserShootDelaySeconds = 0.2;

    constructor(location: Point, parent: Worldspace){
        super(location, parent, parent.camera, Color.ELECTRIC_BLUE, "player")
        this.health = 3
        this.damageAnimation = new PlayerDamageAnimation(this.mesh, 2, 0.2)
    }

    collisionCheck(){

    }

    shoot(initialMovementVector: Vector){
        if(this.canShoot()){
            this.lastShotTime = Date.now();
            this.fireLaserBeam(initialMovementVector.z);
        }  
    }

    private canShoot(): boolean{
        const timeSinceLastShotFired = (Date.now() - this.lastShotTime) / 1000;
        if (timeSinceLastShotFired >= this.laserShootDelaySeconds){
            return true
        }
        return false;
    }

    private fireLaserBeam(initialZVelocity: number){
        let beamStartLocation = new Point(
            this.location.x,
            this.location.y,
            this.location.z + 0.5
        )
        let beam = new LaserBeam(beamStartLocation, this, initialZVelocity)
        this.getWorldspace().objects.other.push(beam)
    }

    takeDamage(){
        if(this.damageAnimation.doAnimation === false){
            this.health -= 1
            //move back to the centre and kick of the damage animation 
            this.translate(new Vector(-this.location.x, 0, 0))
            this.damageAnimation.start()
        }
    }

    tick(){
        this.collisionCheck()
        if (this.health === 0){
            //game over
        }
        this.damageAnimation.execute()
        this.scripts.forEach(behaviourScript => {
            behaviourScript.execute();
        })
    }
}

export { Player }