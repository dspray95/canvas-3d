import WorldObject from "../../../../engine/objects/WorldObject";
import { Mesh } from "../../../../engine/rendering/objects/mesh/Mesh";
import { MeshData } from "../../../../engine/rendering/objects/mesh/MeshData";
import Line from "../../../../engine/rendering/objects/primitives/Line";
import Point from "../../../../engine/rendering/objects/primitives/Point";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { Color } from "../../../../tools/Colors"

class LaserBeam extends Line {
    constructor(location, parent, initialVelocity, color=Color.RED, name="laserBeam"){
        let startPoint = location
        let endPoint = new Point(startPoint.x, startPoint.y, startPoint.z - .5)
        super(startPoint, endPoint, color, 2)

        this.parent = parent
        this.initialVelocity = initialVelocity
        this.beamSpeed = 0.75
        //Lifecyle, beam should be destroyed after n seconds so it isn't firing off into
        //infinity
        this.lifespanSeconds = 2
        this.creationTime = new Date()
    }   

    tick(){
        //Check to see if the beams lifecycle time is up
        let now = new Date()
        let lifecycleInSeconds = (now.getTime() - this.creationTime.getTime()) / 1000
        if (lifecycleInSeconds > this.lifespanSeconds){
            this.destroy()
        }
        //move forward if not destroyed
        this.translate(new Vector(0, 0, this.initialVelocity + this.beamSpeed))
        //check collision
        this.parent.getWorldspace().objects.mobs.forEach(mob => {})
    }

    destroy(){
        let container = this.parent.getWorldspace().objects.other
        const index = container.indexOf(this)
        container.splice(index, 1)
    }
}

export { LaserBeam }


