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