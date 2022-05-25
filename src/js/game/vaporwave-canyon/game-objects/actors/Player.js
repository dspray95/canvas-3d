import { CollisionBox } from "../../../../engine/objects/primitives/CollisionBox";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { Color } from "../../../../tools/Colors";
import { PlayerDamageAnimation } from "../../scripts/animtation/PlayerDamageAnimation";
import { Starfighter } from "./Starfighter";

class Player extends Starfighter {

    constructor(location, parent){
        super(location, parent, Color.ELECTRIC_BLUE, "player")
        this.health = 3
        this.damageAnimation = new PlayerDamageAnimation(this.mesh, 2, 0.2)
    }

    collisionCheck(){
        this.parent.objects.mobs.forEach(mob => {
            if(CollisionBox.checkBoxesCollide(this.collisionBox, mob.collisionBox) 
            && !this.damageAnimation.doAnimation){
                this.takeDamage()
            }
        })
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
    }
}

export { Player }