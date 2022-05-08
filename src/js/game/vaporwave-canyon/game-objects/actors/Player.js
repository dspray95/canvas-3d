import { CollisionBox } from "../../../../engine/objects/primitives/CollisionBox";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { Color } from "../../../../tools/Colors";
import { PlayerDamageAnimation } from "../../scripts/animtation/PlayerDamageAnimation";
import { Starfighter } from "./Starfighter";

class Player extends Starfighter {

    constructor(location, parent){
        super(location, parent, Color.ELECTRIC_BLUE, "player")
        this.health = 3
        this.damageAnimation = new PlayerDamageAnimation(this.mesh, 3, 1)
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
        this.health -= 1
        //Move back to centre
        this.translate(new Vector(-this.location.x, 0, 0))
        this.damageAnimation.doAnimation = true
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