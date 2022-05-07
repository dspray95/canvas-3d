import { CollisionBox } from "../../js/engine/objects/primitives/CollisionBox"
import { Camera } from "../../js/engine/rendering/Camera"
import Point from "../../js/engine/rendering/objects/primitives/Point"

const box = new CollisionBox(
    {location: new Point(0, 0, 0)},
    new Camera(),
    {}
)

describe("collision box max for", () => {
    test("x", () => {
        expect(box.max('x')).toEqual(0.5)
    })
    test("y", () => {
        expect(box.max('y')).toEqual(0.5)
    })
    test("z", () => {
        expect(box.max('z')).toEqual(0.5)
    })
})


describe("collision box min for", () => {
    test("x", () => {
        expect(box.min('x')).toEqual(-0.5)
    })
    test("y", () => {
        expect(box.min('y')).toEqual(-0.5)
    })
    test("z", () => {
        expect(box.min('z')).toEqual(-0.5)
    })
})

describe("intersectCollisionBox", () => {
    test("does intersect", () => {
        const boxIntersects = new CollisionBox(
            {location: new Point(0, 0, -0.25)},
            new Camera(),
            {}
        )
        expect(box.intersectCollisionBox(boxIntersects)).toEqual(true)
    })
    test("does not intersect", () => {
        const boxIntersects = new CollisionBox(
            {location: new Point(20, 20, 20)},
            new Camera(),
            {}
        )
        expect(box.intersectCollisionBox(boxIntersects)).toEqual(false)
    })
})