import Vector from "../../../engine/rendering/objects/primitives/Vector";
import { BehaviourScript } from "./BehaviourScript";

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
        this.distanceTravelled = 0
    }

    move(input){
        if (input === 'w'){
            this.camera.translate(new Vector(0, 0, 0.1))
        } 
        else if(input === 's'){
            this.camera.translate(new Vector(0, 0, -0.1))
        }
        else if(input === 'a'){
            this.camera.translate(new Vector(-0.1, 0, 0))
        }
        else if(input === 'd'){
            this.camera.translate(new Vector(0.1, 0, 0))
        } 
        else if(input === 'q'){
            this.camera.rotate('y', 0.001)
        }
        else if(input === 'e'){
            this.camera.rotate('y', -0.001)
        }
    }

    execute(){
        if(this.maxDistance === -1 || this.distanceTravelled < this.maxDistance){
            this.camera.translate(new Vector(0, 0, this.speed))
            this.distanceTravelled += this.speed
        }
    }
}