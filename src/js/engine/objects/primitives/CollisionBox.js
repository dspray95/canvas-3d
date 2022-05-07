import { Color } from "../../../tools/Colors";
import Vector from "../../rendering/objects/primitives/Vector";
import { CuboidMesh } from "./Cuboid";

class CollisionBox extends CuboidMesh{

    constructor( 
        parent, 
        camera, {
          scale=new Vector(1, 1, 1),
          visible=false
        })
    {
        super( 
            parent, 
            camera, {
              scale: scale,
              color: new Color(200, 10, 50, 0.8)
        })
        this.visible = visible
    }

    intersectCollisionBox(otherBox){
        return (
            (this.min('x') <= otherBox.max('x') && this.max('x') >= otherBox.min('x')) &&
            (this.min('y') <= otherBox.max('y') && this.max('y') >= otherBox.min('y')) &&
            (this.min('z') <= otherBox.max('z') && this.max('z') >= otherBox.min('z'))
        )
    }

    min(dimension){
        return this.vertices.reduce((previous, current) => {
            return previous[dimension] < current[dimension] ? previous : current
        })[dimension]
    }

    max(dimension){
        return this.vertices.reduce((previous, current) => {
            return previous[dimension] > current[dimension] ? previous : current
        })[dimension]
    }
}

export { CollisionBox }