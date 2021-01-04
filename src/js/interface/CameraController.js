export default class CameraController{
  constructor(camera){
    this.camera = camera
  }

  turn(direction, speed){
    let angle = 1
    switch(direction){
      case "left":
        this.camera.viewingDirection.rotate("y", -angle)
        .unitLengthVector()
        .viewingDirectionVector()
        this.camera.cameraToOriginMatrix = this.camera.cameraToOrigin();
        break
      case "right": 
      this.camera.viewingDirection.rotate("y", angle)
      .unitLengthVector()
      .viewingDirectionVector()
      this.camera.cameraToOriginMatrix = this.camera.cameraToOrigin();
      break
    }
  }

}