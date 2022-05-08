import { toHaveStyle } from "@testing-library/jest-dom"
import { Time } from "../../../../engine/time"
import { BehaviourScript } from "../BehaviourScript"

class PlayerDamageAnimation extends BehaviourScript{

    constructor(playerMesh, durationSeconds, flashDurationSeconds){
        this.doAnimation = false
        this.playerMesh = playerMesh
        this.duration = durationSeconds / 1000
        this.flashDuration = flashDurationSeconds / 1000
        this.timeAnimated = 0
        this.timeInState = 0
    }

    start(){

    }

    execute(){
        if(!this.doAnimation){
            return
        }

        if(this.timeInState > this.flashDuration){
            this.playerMesh.doDrawCall = !this.playerMesh.doDrawCall 
            this.timeInState = 0 
        } 
        this.timeInState += Time.deltaTime
        this.timeAnimated += Time.deltaTime

        if(this.timeAnimated >= this.duration){
            this.doAnimation = false
            this.timeAnimated = 0
            this.timeInState = 0
            this.playerMesh.doDrawCall = true
        }
    }

}

export { PlayerDamageAnimation }

