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
            (this.min('x') <= otherBox.max('x') && this.max('x') >= otherBox.min('x')) &&
            (this.min('x') <= otherBox.max('x') && this.max('x') >= otherBox.min('x'))
        )
    }

    min(dimension){
        this.vertices.reduce((previous, current) => {
          return previous[dimension] < current[dimension] ? previous[dimension] : current[dimension]
        })
    }

    max(dimension){
        this.vertices.reduce((previous, current) => {
          return previous[dimension] > current[dimension] ? previous[dimension] : current[dimension]
        })
    }
}

export { CollisionBox }