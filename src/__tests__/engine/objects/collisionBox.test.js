import { CollisionBox } from "../../../js/engine/objects/primitives/CollisionBox"
import { Camera } from "../../../js/engine/rendering/Camera"
import Point from "../../../js/engine/rendering/objects/primitives/Point"
import { CameraConfig } from "../../../config/CameraConfig"

const camera = new Camera(
    {},
    1920,
    1080,
    CameraConfig
)

const box = new CollisionBox(
    {location: new Point(0, 0, 0)},
    camera,
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
            camera,
            {}
        )
        expect(CollisionBox.checkBoxesCollide(box, boxIntersects)).toEqual(true)
    })
    test("does not intersect", () => {
        const boxDoesNotIntersect = new CollisionBox(
            {location: new Point(20, 20, 20)},
            camera,
            {}
        )
        expect(CollisionBox.checkBoxesCollide(box, boxDoesNotIntersect)).toEqual(false)
    })
})