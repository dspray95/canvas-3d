import Vector from "../../../engine/rendering/objects/primitives/Vector";
import { BehaviourScript } from "./BehaviourScript";
import { Logger } from "../../../engine/logging/logger"

const Direction = {
    FWD: 'w',
    BCK: 's',
    LFT: 'a',
    RGT: 'd'
}

export class CameraController extends BehaviourScript{

    constructor(camera, speed=0.4, maxDistance=-1){
        super()
        this.camera = camera
        this.maxDistance = maxDistance
        this.speed = speed
        this.rotationSpeed = 0.001
        this.distanceTravelled = 0
        this.moving = false
        this.movementVector = new Vector(0, 0, 0)
        this.rotationAmount = 0
    }

    move(input, action){
        //This is pretty grim
        switch(input.toLowerCase()){
            case 'w':
                if(action === "startMovement" && this.movementVector.z !== this.speed){
                    this.movementVector.z = this.speed
                }
                else if(action === "stopMovement" && this.movementVector.z === this.speed){
                    this.movementVector.z = 0
                }
                break;

            case 's':
                if(action === "startMovement" && this.movementVector.z !== -this.speed){
                    this.movementVector.z = -this.speed
                }
                else if(action === "stopMovement" && this.movementVector.z === -this.speed){
                    this.movementVector.z = 0
                }  
                break;

            case 'a':
                if(action === "startMovement" && this.movementVector.x !== -this.speed){
                    this.movementVector.x = -this.speed
                }
                else if(action === "stopMovement" && this.movementVector.x === -this.speed){
                    this.movementVector.x = 0
                }     
                break;
         
            case 'd': 
                if(action === "startMovement" && this.movementVector.x !== this.speed){
                    this.movementVector.x = this.speed
                }
                else if(action === "stopMovement" && this.movementVector.x === this.speed){
                    this.movementVector.x = 0
                }
                break;

            case 'q':
                if(action === "startMovement" && this.rotationAmount !== -this.rotationSpeed){
                    this.rotationAmount = -this.rotationSpeed
                }
                else if(action === "stopMovement" && this.rotationAmount === -this.rotationSpeed){
                    this.rotationAmount = 0
                    console.log("stopping q")
                }    
                break;
 
            case 'e':
                if(action === "startMovement" && this.rotationAmount !== this.rotationSpeed){
                    this.rotationAmount = this.rotationSpeed
                }
                else if(action === "stopMovement" && this.rotationAmount === this.rotationSpeed){
                    this.rotationAmount = 0
                    console.log("stopping e")
                }    
                break;

            default:
                return 
        }

    }

    execute(){
        if(this.maxDistance === -1 || this.distanceTravelled < this.maxDistance){
            this.camera.translate(new Vector(0, 0, this.speed))
            this.distanceTravelled += this.speed
        } 
        else{
            if(this.movementVector.x != 0 || this.movementVector.y != 0 || this.movementVector.z != 0) {
                this.camera.translate(this.movementVector)
            } 
            if(this.rotationAmount != 0){
                this.camera.rotate('y', this.rotationAmount)
            }
        } 
    }
}