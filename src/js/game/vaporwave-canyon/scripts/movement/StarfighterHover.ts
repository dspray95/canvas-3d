import { Time } from "../../../../engine/Time";
import { Logger } from "../../../../engine/logging/logger";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { Starfighter } from "../../game-objects/actors/Starfighter";
import { BehaviourScript } from "../BehaviourScript"

export class StarfighterHover extends BehaviourScript{

    currentHoverDirection: HoverDirection = HoverDirection.UP;
    starfighter: Starfighter;
    starfighterStartY: number;
    hoverLimit: number = 0.025;
    hoverSpeed: number = 0.15;
    
    createdAt: number;
    animDelayMilliseconds: number;
    animStarted: boolean;

    constructor(starfighter: Starfighter){
        super()
        this.starfighter = starfighter
        this.starfighterStartY = starfighter.location.y;
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
            //we should instead start part of the way through the animation cycle
            //otherwise it can look like a freeze to the user
            this.animStarted = true;
        }
    }

    private doHover(): void{
        let newMovementVector = new Vector(0, this.hoverSpeed * Time.deltaTime, 0);
        if(this.currentHoverDirection === HoverDirection.DOWN)
        {
            newMovementVector.y = -this.hoverSpeed * Time.deltaTime;
        }
        this.starfighter.translate(newMovementVector);
    }

    private updateFloatDirectionAndVector(): void{
        if(
            this.currentHoverDirection === HoverDirection.UP &&
            this.starfighter.location.y >= this.starfighterStartY + this.hoverLimit
        ){
            this.currentHoverDirection = HoverDirection.DOWN
        } 
        else if(
            this.currentHoverDirection == HoverDirection.DOWN &&
            this.starfighter.location.y <= this.starfighterStartY - this.hoverLimit
        ){
            this.currentHoverDirection = HoverDirection.UP
        }
    }
}

enum HoverDirection {
    UP,
    DOWN
}