import { Logger } from "../../../../engine/logging/logger";
import Point from "../../../../engine/rendering/objects/primitives/Point";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { LaserBeam } from "../../game-objects/actors/LaserBeam";
import { BehaviourScript } from "../BehaviourScript";

class PlayerController extends BehaviourScript{

    constructor(playerObject, cameraObject, playerHorizonalSpeed=0.1, cameraSpeed=0.4, moveCamera=true){
        super()
        this.player = playerObject
        this.playerHorizonalSpeed = playerHorizonalSpeed
        this.camera = cameraObject
        this.cameraSpeed = cameraSpeed
        this.moveCamera = moveCamera


        this.hoverLimit = 0.025
        this.hoverIncriment = 0.004
        this.currentHoverDirection = "up"
        this.playerStartY = this.player.location.y

        this.playerMovementVector = new Vector(0, this.hoverIncriment, this.cameraSpeed)

    }

    movePlayerDownCanyon(){
        this.camera.translate(new Vector(0, 0, this.cameraSpeed))
        if(this.player.location.x <= -1 && 
            this.playerMovementVector.x == -this.playerHorizonalSpeed){
                this.playerMovementVector.x = 0
        }
        if(this.player.location.x >= 1 && 
            this.playerMovementVector.x == this.playerHorizonalSpeed){
                this.playerMovementVector.x = 0
        }
        this.player.translate(this.playerMovementVector)
    }

    parseInput(keyCode, action){
        //This method of key input doesn't allow for multiple simultanious key presses
        //rethink required
        if(keyCode === 65){
            if(action === "keyDown" && this.player.location.x > -1){
                this.playerMovementVector.x = -this.playerHorizonalSpeed
            }
            else if(action === "keyUp"){
                this.playerMovementVector.x = 0
            }
        } 
        else if(keyCode === 68){
            if(action === "keyDown" && this.player.location.x < 1){
                this.playerMovementVector.x = this.playerHorizonalSpeed
            } 
            else if(action === "keyUp"){
                this.playerMovementVector.x = 0
            }
        } 
        else if(keyCode === 32){
            if (action == "keyDown"){
                let beamStartLocation = new Point(
                    this.player.location.x,
                    this.player.location.y,
                    this.player.location.z + 0.5
                )
                let beam = new LaserBeam(beamStartLocation, this.player, this.playerMovementVector.y)
                this.player.getWorldspace().objects.other.push(beam)
            }

        }
    }

    hoverFloat(){
       if(this.currentHoverDirection === "up" &&
            this.player.location.y >= this.playerStartY + this.hoverLimit){
           this.playerMovementVector.y = -this.hoverIncriment
           this.currentHoverDirection = "down"
       } 
       else if(this.currentHoverDirection == "down" &&
            this.player.location.y <= this.playerStartY - this.hoverLimit){
                this.playerMovementVector.y = this.hoverIncriment
                this.currentHoverDirection = "up"
            }
    }

    execute(){
        this.hoverFloat()
        if(this.moveCamera){
            this.movePlayerDownCanyon()
        }
    }

}

export { PlayerController }