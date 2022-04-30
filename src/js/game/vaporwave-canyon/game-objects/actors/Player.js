import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { Color } from "../../../../tools/Colors";
import { Starfighter } from "./Starfighter";

class Player extends Starfighter {

    constructor(location, parent){
        super(location, parent, Color.ELECTRIC_BLUE, "player")
        this.health = 3
    }

    collisionCheck(){
        this.parent.objects.mobs.forEach(mob => {
            //This collision check doesn't quite work
            //Its very naive and only takes into account the player's centrepoint
            //so if the wing hits the mob it still might not trigger the damage
            //Could implement a bounding line across the width of the player (1unit) 
            if( mob.collisionBox 
                && mob.location.x > this.location.x - 0.5 
                && mob.location.x < this.location.x + 0.5
                && Math.floor(mob.location.z) === Math.floor(this.location.z)
            ){
                this.takeDamage()
            }
        })
    }

    takeDamage(){
        this.health -= 1
        //Move back to centre
        this.translate(new Vector(-this.location.x, 0, 0))
        //Do damage animation
    }

    tick(){
        this.collisionCheck()
        if (this.health === 0){
            //game over man
        }
    }
}

export { Player }