import { Color } from "../../../tools/Colors";
import Vector from "../../rendering/objects/primitives/Vector";
import { CuboidMesh } from "./Cuboid";

const COLLISION_BOX_COLOR = new Color(200, 10, 50, 0.8)

class CollisionBox extends CuboidMesh{

    constructor( 
        parent, 
        camera, {
          scale=new Vector(1, 1, 1),
          isVisible=false
        })
    {
        super( 
            parent, 
            camera, {
              scale: scale,
              color: new Color(COLLISION_BOX_COLOR)
        })
        this.doDrawCall = isVisible
    }

    static checkBoxesCollide(boxA, boxB){
        return (
            (boxA.min('y') <= boxB.max('y') && boxA.max('y') >= boxB.min('y')) &&
            (boxA.min('x') <= boxB.max('x') && boxA.max('x') >= boxB.min('x')) &&
            (boxA.min('z') <= boxB.max('z') && boxA.max('z') >= boxB.min('z'))
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