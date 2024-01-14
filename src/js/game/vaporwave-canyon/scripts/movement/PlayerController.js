import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { BehaviourScript } from "../BehaviourScript";

class PlayerController extends BehaviourScript{

    constructor(playerObject, cameraObject, playerHorizonalSpeed=0.1, cameraSpeed=0.4, moveCamera=true){
        super()
        this.player = playerObject
        this.playerHorizonalSpeed = playerHorizonalSpeed
        this.camera = cameraObject
        this.cameraSpeed = cameraSpeed
        this.moveCamera = moveCamera

        this.playerMovementVector = new Vector(0, 0, this.cameraSpeed)

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
                this.player.shoot(this.playerMovementVector);
            }

        }
    }

    execute(){
        if(this.moveCamera){
            this.movePlayerDownCanyon()
        }
    }

}

export { PlayerController }