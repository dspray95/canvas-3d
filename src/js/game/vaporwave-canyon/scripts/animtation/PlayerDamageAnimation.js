import { Logger } from "../../../../engine/logging/logger"
import { Time } from "../../../../engine/Time"
import { BehaviourScript } from "../BehaviourScript"

const DAMAGE_OPACITY_MODIFIER = 0.8
const PLAYER_STARTING_OPACITY = 1

class PlayerDamageAnimation extends BehaviourScript{

    constructor(playerMesh, durationSeconds, flashDurationSeconds){
        super()
        this.doAnimation = false
        this.playerMesh = playerMesh
        this.duration = durationSeconds * 1000
        this.flashDuration = flashDurationSeconds * 1000
        this.timeAnimated = 0
        this.timeInState = 0
    }

    start(){
        this.doAnimation = true
        this.playerMesh.setOpacity(DAMAGE_OPACITY_MODIFIER)
    }

    end(){
        this.doAnimation = false
        this.timeAnimated = 0
        this.timeInState = this.flashDuration + 1
        this.playerMesh.doDrawCall = true
        this.playerMesh.setOpacity(PLAYER_STARTING_OPACITY)
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
           this.end()
        }
    }

}

export { PlayerDamageAnimation }

