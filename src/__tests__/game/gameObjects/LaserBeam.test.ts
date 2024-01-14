import Point from "../../../js/engine/rendering/objects/primitives/Point"
import { LaserBeam } from "../../../js/game/vaporwave-canyon/game-objects/actors/LaserBeam"

let laserBeam: LaserBeam;
let beamStartPos: Point;
let beamStartVelocity: number;
let beamLength = 1;

beforeEach(() => {
    beamStartPos = new Point(0, 0, 1);
    beamStartVelocity = 0;
    laserBeam = new LaserBeam(beamStartPos, {}, beamStartVelocity, beamLength);
})

describe("LaserBeam", () => {
    describe("interpolateLaserPoints with 5 points", () => {
        const numberOfPoints = 5;
        it("should create the correct number of points", () => {
            const interpolatedPoints = laserBeam.interpolateLaserPoints(numberOfPoints);
            expect(interpolatedPoints.length).toEqual(numberOfPoints);
        })
        it("should create points in the correct worldspace positions", () => {
            const interpolatedPoints = laserBeam.interpolateLaserPoints(numberOfPoints);
            //start point
            expect(interpolatedPoints[0].x).toEqual(0)
            expect(interpolatedPoints[0].y).toEqual(0)
            expect(interpolatedPoints[0].z).toEqual(1)
            //2nd point
            expect(interpolatedPoints[1].x).toEqual(0)
            expect(interpolatedPoints[1].y).toEqual(0)
            expect(interpolatedPoints[1].z).toBeCloseTo(0.75)
            //3rd point
            expect(interpolatedPoints[2].x).toEqual(0)
            expect(interpolatedPoints[2].y).toEqual(0)
            expect(interpolatedPoints[2].z).toEqual(0.5)
            //4th point
            expect(interpolatedPoints[3].x).toEqual(0)
            expect(interpolatedPoints[3].y).toEqual(0)
            expect(interpolatedPoints[3].z).toEqual(0.25)
            //final point
            expect(interpolatedPoints[4].x).toEqual(0)
            expect(interpolatedPoints[4].y).toEqual(0)
            expect(interpolatedPoints[4].z).toEqual(0)

        })
    })
})