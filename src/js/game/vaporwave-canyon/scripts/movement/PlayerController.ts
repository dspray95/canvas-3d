import { Time } from "../../../../engine/Time";
import { Logger } from "../../../../engine/logging/logger";
import { Camera } from "../../../../engine/rendering/Camera";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { Player } from "../../game-objects/actors/Player";
import { BehaviourScript } from "../BehaviourScript";

class PlayerController extends BehaviourScript{

    player: Player;
    playerHorizonalSpeed: number;
    camera: Camera;
    zMovementSpeed: number;
    moveCamera: boolean;
    playerMovementVector: Vector;

    constructor(playerObject: Player, cameraObject: Camera, playerHorizonalSpeed: number=0.1, zMovementSpeed: number=0.4, moveCamera: boolean=true){
        super()
        this.player = playerObject
        this.playerHorizonalSpeed = playerHorizonalSpeed
        this.camera = cameraObject
        this.zMovementSpeed = 7.5
        this.moveCamera = moveCamera

        this.playerMovementVector = new Vector(0, 0, 0)

    }

    movePlayerDownCanyon(){
        if(this.player.location.x <= -1 && this.getMovementDirection() == HorizontalMovementDirection.LEFT){
                this.playerMovementVector.x = 0
        }
        if(this.player.location.x >= 1 && this.getMovementDirection() == HorizontalMovementDirection.RIGHT){
                this.playerMovementVector.x = 0
        }
        let zMovementSpeed = this.zMovementSpeed * Time.deltaTime
        this.camera.translate(new Vector(0, 0, zMovementSpeed))
        this.playerMovementVector.z = zMovementSpeed;
        this.player.translate(this.playerMovementVector)
    }

    parseInput(keyCode: number, action: string){
        enum PlayerAction {
            MOVE_LEFT = 65,
            MOVE_RIGHT = 68,
            SHOOT = 32
        }
        enum EventType {
            START = "keyDown",
            END = "keyUp"
        }

        if(keyCode === PlayerAction.MOVE_LEFT){
            if(action === EventType.START && this.player.location.x > -1){
                this.playerMovementVector.x = -this.playerHorizonalSpeed * Time.deltaTime;
            }
            else if(action === EventType.END && this.getMovementDirection() == HorizontalMovementDirection.LEFT){
                this.playerMovementVector.x = 0
            }
        } 
        else if(keyCode === PlayerAction.MOVE_RIGHT){
            if(action === EventType.START && this.player.location.x < 1){
                this.playerMovementVector.x = this.playerHorizonalSpeed * Time.deltaTime
            } 
            else if(action === EventType.END && this.getMovementDirection() == HorizontalMovementDirection.RIGHT){
                this.playerMovementVector.x = 0
            }
        } 
        else if(keyCode === PlayerAction.SHOOT){
            if (action == EventType.START){
                this.player.shoot(this.playerMovementVector);
            }

        }
    }

    getMovementDirection(): HorizontalMovementDirection{
        if(this.playerMovementVector.x > 0){
            return HorizontalMovementDirection.RIGHT
        } else if (this.playerMovementVector.x < 0){
            return HorizontalMovementDirection.LEFT
        } else {
            return HorizontalMovementDirection.STATIONARY
        }
    }

    execute(){
        if(this.moveCamera){
            this.movePlayerDownCanyon()
        }
    }
}

enum HorizontalMovementDirection{
    LEFT,
    RIGHT,
    STATIONARY
}

export { PlayerController }