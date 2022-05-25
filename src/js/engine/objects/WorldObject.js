import { Color } from "../../tools/Colors";
import { Worldspace } from "../Worldspace";

export default class WorldObject {
  
  constructor(location, parent, name="WorldObject") {
    this.location = location;
    this.parent = parent;
    this.points = [];
    this.perspectivePoints = [];
    this.edges = []
    this.faces = []
    this.scripts = []
    this.mesh = null
    this.done = false;
    this.verticeColor =  Color.YELLOW;
    this.lineColor = Color.BLUE;
    this.name = name
    this.logPerspectivePos = false;
    this.logged = false;
  }

  getWorldspace(){
    if(this.parent instanceof Worldspace){
      return this.parent
    } else {
      return this.parent.getWorldspace()
    }
  }

  drawPerspective(ctx, camera) {
    this.mesh.draw(ctx, camera)
    if(this.collisionBox.doDrawCall){
      this.collisionBox.draw(ctx, camera)
    }
    this.done = true;
  }
  
  rotate(axis, angle, origin=this){
    this.location.rotate(axis, angle)
    if(this.mesh){
      this.mesh.rotate(axis, angle)
    }
  }

  translate(vector){
    this.location.add(vector)
    if(this.mesh){
      this.mesh.translate(vector)
      if(this.collisionBox) this.collisionBox.translate(vector)
    }
  }

  tick() {}
}
