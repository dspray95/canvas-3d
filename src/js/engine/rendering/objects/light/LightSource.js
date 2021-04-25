export default class LightSource{

  constructor(location, color, brightness, type){
    this.location = location
    this.color = color
    this.brightness = brightness
    this.type = type
    this.movingLeft = false
  }

  tick(){
    if(this.movingLeft){
      this.location.translate(1, 0, 0)
    } else {
      this.location.translate(-1, 0, 0)
    }

    if(this.movingLeft && this.location.x > 200){
      this.movingLeft = false
    } 
    else if(this.location.x < -200){
      this.movingLeft = true
    }
  }

}