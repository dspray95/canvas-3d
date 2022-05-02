import { CollisionBox } from "../../js/engine/objects/primitives/CollisionBox"
// import { Camera } from "../../js/engine/rendering/Camera"
import Point from "../../js/engine/rendering/objects/primitives/Point"


describe("collision box max for", () => {
    // jest.mock(Camera)
    let box = new CollisionBox(
        {location: new Point(0, 0, 0)},
        {}
    )    
    test("x", () => {
        expect(box.max('x')).to.equal(0.5)
    })
    test("y", () => {
        expect(box.max('y')).to.equal(0.5)
    })
    test("z", () => {
        expect(box.max('z')).to.equal(0.5)
    })
})
