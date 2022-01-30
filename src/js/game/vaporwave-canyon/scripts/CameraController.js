import Vector from "../../../engine/rendering/objects/primitives/Vector";
import { BehaviourScript } from "./BehaviourScript";

export class CameraController extends BehaviourScript{

    constructor(camera){
        super()
        this.camera = camera
    }

    execute(){
        this.camera.translate(new Vector(0, 0, 1))
    }
}