import { Logger } from "../../../../engine/logging/logger";
import Line from "../../../../engine/rendering/objects/primitives/Line";
import Point from "../../../../engine/rendering/objects/primitives/Point";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { Color } from "../../../../tools/Colors"
import { isShootable } from "../interface/Shootable";

const logger = Logger.logger;

class LaserBeam extends Line {

    //Lifecyle, beam should be destroyed after n seconds so it isn't firing off into infinity
    static beamLifespanSeconds: number = 2;

    beamSpeed: number = 0.75;
    parent: any;
    creationTime: number;
    previousPosition: Point;
    beamLength: number;

    constructor(location: Point, parent: any, initialZVelocity: number, beamLength: number = 1, color=Color.RED){
        let startPoint = location
        let endPoint = new Point(startPoint.x, startPoint.y, startPoint.z - beamLength)
        super(startPoint, endPoint, color, 2)

        this.parent = parent
        this.beamSpeed += initialZVelocity;
        this.previousPosition = location;
        this.beamLength = beamLength;
        this.creationTime = Date.now()
    }   

    tick(){
        //Check to see if the beams lifecycle time is up
        let now = Date.now()
        let lifecycleInSeconds = (now - this.creationTime) / 1000
        if (lifecycleInSeconds > LaserBeam.beamLifespanSeconds){
            this.destroy()
        }
        //move forward if not destroyed
        this.translate(new Vector(0, 0, this.beamSpeed))
        //check collision, shootable objects decide how to handle getting shot
        //if we hit something we destroy the beam
        this.parent.getWorldspace().objects.mobs.forEach((object: any) => {
            if(isShootable(object)){
                const points = this.interpolateLaserPoints(10);
                for(let point of points){
                    if(object.isShot(point)){
                        this.destroy();
                        break;
                    }
                }
            }
        });
    }

    private getEndPointAtLastFrame(){
        let endPointAtLastFrame: Point = this.endPoint.copy();
        endPointAtLastFrame.add(new Vector(0, 0, -this.beamSpeed))
        return endPointAtLastFrame
    }

    private getStartPointAtLastFrame(){
        let startPointAtLastFrame: Point = this.startPoint.copy();
        startPointAtLastFrame.add(new Vector(0, 0, -this.beamSpeed))
        return startPointAtLastFrame
    }

    interpolateLaserPoints(nLaserInterpolationPoints: number = 5): Array<Point>{
        if (nLaserInterpolationPoints < 2){
            throw new Error("Laser beam must have at least two interpolation points")
        }

        let endPointAtLastFrame = this.getEndPointAtLastFrame()
        //Extend beam back in case we pass through an object in a single frame
        endPointAtLastFrame.add(new Vector(0, 0, -this.beamSpeed))
        let startPointAtLastFrame = this.getStartPointAtLastFrame()

        let points: Array<Point> = [startPointAtLastFrame];
        const startToEndVector: Vector = startPointAtLastFrame.getVectorTo(endPointAtLastFrame);
        const startToEndDistance: number = startPointAtLastFrame.distanceTo(endPointAtLastFrame);
        const distanceStep: number = startToEndDistance / (nLaserInterpolationPoints - 1)

        for (let i = 1; i < nLaserInterpolationPoints - 1; i++) {
            const vectorFromStartPoint: Vector = startToEndVector.scale(distanceStep * i);

            let nextPoint = startPointAtLastFrame.copy();
            nextPoint.add(vectorFromStartPoint);
            points.push(nextPoint);
        }

        points.push(endPointAtLastFrame);
        return points
    }

    destroy(){
        let container = this.parent.getWorldspace().objects.other
        const index = container.indexOf(this)
        container.splice(index, 1)
        this.isVisible = false;
    }
}

export { LaserBeam }


