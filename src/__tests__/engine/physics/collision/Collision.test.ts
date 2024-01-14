import { Collision } from "../../../../js/engine/physics/collision/Collision";

describe("Collision", () => {
    describe("Single point collision", () => {
        describe("pointCollides2D", () => {
            const lowerXBound = 0;
            const upperXBound = 2;
            const lowerYBound = 0;
            const upperYBound = 2;

            it("should return true when point is inside bounds", () => {
                const pointX = 1;
                const pointY = 1;

                expect(Collision.pointCollides2D(
                    pointX,
                    pointY,
                    lowerXBound,
                    upperXBound,
                    lowerYBound,
                    upperYBound
                )).toBe(true);
            })
            it("should return false when point is outside bounds", () => {
                const pointX = 20;
                const pointY = 0;
                expect(Collision.pointCollides2D(
                    pointX,
                    pointY,
                    lowerXBound,
                    upperXBound,
                    lowerYBound,
                    upperYBound
                )).toBe(false);
            })
        })
    })
})