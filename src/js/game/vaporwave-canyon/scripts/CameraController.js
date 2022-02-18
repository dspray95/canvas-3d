import Vector from "../../../engine/rendering/rendering-objects/primitives/Vector";
import { BehaviourScript } from "./BehaviourScript";

export class CameraController extends BehaviourScript{

    constructor(camera, maxDistance=-1, speed=0.4){
        super()
        this.camera = camera
        this.maxDistance = maxDistance
        this.speed = speed
        this.distanceTravelled = 0
    }

    execute(){
        if(this.maxDistance === -1 || this.distanceTravelled < this.maxDistance){
            this.camera.translate(new Vector(0, 0, this.speed))
            this.distanceTravelled += this.speed
        }

    }
}