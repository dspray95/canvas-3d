import { Logger } from "../../../../engine/logging/logger";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { Starfighter } from "../../game-objects/actors/Starfighter";
import { BehaviourScript } from "../BehaviourScript"

export class StarfighterHover extends BehaviourScript{

    currentHoverDirection: string = "up";
    starfighter: Starfighter;
    starfighterStartY: number;
    hoverLimit: number = 0.025;
    starfighterMovementVector: Vector;
    hoverIncrement: number = 0.004;
    
    createdAt: number;
    animDelayMilliseconds: number;
    animStarted: boolean;

    constructor(starfighter: Starfighter){
        super()
        this.starfighter = starfighter
        this.starfighterStartY = starfighter.location.y;
        this.starfighterMovementVector = new Vector(0, this.hoverIncrement, 0);
        this.createdAt = Date.now();
        this.animDelayMilliseconds = Math.random() * 2 * 1000;
        this.animStarted = false;
    }
    
    execute(): void {
        if(this.animStarted){ 
            this.updateFloatDirectionAndVector();
            this.doHover()
        } else if(Date.now() > this.createdAt + this.animDelayMilliseconds) {
            //TODO a delay isn't actually the best way to do this
            //we should instead start part of the way through the animsation cycle
            //otherwise it can look like a freeze to the user
            this.animStarted = true;
        }
    }

    private doHover(): void{
        this.starfighter.translate(this.starfighterMovementVector);
    }

    private updateFloatDirectionAndVector(): void{
        if(
            this.currentHoverDirection === "up" &&
            this.starfighter.location.y >= this.starfighterStartY + this.hoverLimit
        ){
            this.starfighterMovementVector.y = -this.hoverIncrement
            this.currentHoverDirection = "down"
        } 
        else if(
            this.currentHoverDirection == "down" &&
            this.starfighter.location.y <= this.starfighterStartY - this.hoverLimit
        ){
            this.starfighterMovementVector.y = this.hoverIncrement
            this.currentHoverDirection = "up"
        }
    }
}