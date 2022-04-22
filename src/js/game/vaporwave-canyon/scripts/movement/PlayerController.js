import { Logger } from "../../../../engine/logging/logger";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { BehaviourScript } from "../BehaviourScript";

class PlayerControler extends BehaviourScript{

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
            //fire the cannon
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

export { PlayerControler }