import { BehaviourScript } from "../../game/vaporwave-canyon/scripts/BehaviourScript";
import { Color } from "../../tools/Colors";
import { Worldspace } from "../Worldspace";
import { TranslationMatrix3D } from "../rendering/matrices/Transform";
import { Mesh } from "../rendering/objects/mesh/Mesh";
import Point from "../rendering/objects/primitives/Point";
import Vector from "../rendering/objects/primitives/Vector";

export default class WorldObject {

  location: Point;
  parent: any;
  mesh: Mesh | null;
  done: boolean;
  name: string;
  collisionBox: any;
  scripts: Array<BehaviourScript> = []
  
  constructor(location: Point, parent: any, name: string="WorldObject") {
    this.location = location;
    this.parent = parent;
    this.mesh = null
    this.done = false;
    this.name = name
  }

  getWorldspace(){
    if(this.parent instanceof Worldspace){
      return this.parent
    } else {
      return this.parent.getWorldspace()
    }
  }

  drawPerspective(ctx: any, camera: any) {
    if(this.mesh){ 
      this.mesh.draw(ctx, camera)
      if(this.collisionBox.doDrawCall){
        this.collisionBox.draw(ctx, camera)
      }
      this.done = true;
    }
  }
  
  rotate(axis: string, angle: number, origin: Point=this.location){
    const objectToOrigin: Vector = new Vector(
      origin.x - this.location.x,
      origin.y - this.location.y,
      origin.z - this.location.z
    )

    this.translate(objectToOrigin)

    this.location.rotate(axis, angle)
    if(this.mesh){
      this.mesh.rotate(axis, angle)
    }

    const orignToObjectOriginalPosition = new Vector(
      -objectToOrigin.x,
      -objectToOrigin.y,
      -objectToOrigin.z
    );
    this.translate(orignToObjectOriginalPosition);
  }

  translate(vector: Vector){
    this.location.add(vector)
    if(this.mesh){
      this.mesh.translate(vector)
      if(this.collisionBox) this.collisionBox.translate(vector)
    }
  }

  tick() {}
}
