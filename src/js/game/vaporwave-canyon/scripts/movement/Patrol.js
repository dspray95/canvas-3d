import { BehaviourScript } from "../BehaviourScript";

class Patrol extends BehaviourScript{

  constructor(){
    this.distanceTravelled = 0;
    this.goingForward = true;
  }

  execute(){
    if (this.distanceTravelled < 100 && this.goingForward){
      this.translate(new Vector(0, 0, -2))
      this.distanceTravelled++
    }
    else if(this.distanceTravelled > 0 && !this.goingForward){
      this.translate(new Vector(0, 0, 2))
      this.distanceTravelled--
    }

    if (this.distanceTravelled > 100 && this.goingForward){
      this.goingForward = false
    } else if (this.distanceTravelled < 0 && !this.goingForward){
      this.goingForward = true
    }
  }

}