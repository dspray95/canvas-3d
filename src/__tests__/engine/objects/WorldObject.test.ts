import { CONFIG, ENVIRONMENT } from "../../../config/config"
import { TestConfig } from "../../../config/env/testCongfig"
import { Worldspace } from "../../../js/engine/Worldspace"
import WorldObject from "../../../js/engine/objects/WorldObject"
import { CuboidMesh } from "../../../js/engine/objects/primitives/Cuboid"
import { Camera } from "../../../js/engine/rendering/Camera"
import Point from "../../../js/engine/rendering/objects/primitives/Point"
import Vector from "../../../js/engine/rendering/objects/primitives/Vector"
import { Color } from "../../../js/tools/Colors"

let worldpsace = new Worldspace(1920, 1080)
beforeEach(() => {
    worldpsace = new Worldspace(1920, 1080)
})

describe("WorldObject", () => {
    describe("With mesh", () => { 
        describe("when rotating, and object position is at the worldspace origin", () => {
            it("Should rotate it's meshes points around the correct origin", () => {
                let originPoint = new Point(0, 0, 0)
                let rotationDegrees = 180
                let object = new WorldObject(originPoint, worldpsace)

                object.mesh = new CuboidMesh(
                    object, 
                    worldpsace.camera,
                    {
                        scale: new Vector(1, 1, 1),
                        color: Color.RED
                    }
                );
                object.rotate("y", rotationDegrees, originPoint);
                //first vertice in the cuboid is created at (-xOffset, -yOffset, -zOffset)
                //so it should rotate into (xOffset, -yOffset, zOffset) when rotating 180 
                //degrees around the y axis
                const firstVertice: Point = object.mesh.vertices[0];
                expect(firstVertice.x).toBeCloseTo(0.5);
                expect(firstVertice.y).toBeCloseTo(-0.5);
                expect(firstVertice.z).toBeCloseTo(0.5);
            })
        })
        describe('when rotating, and object position is not at the worldspace origin', () => { 
            it("should rotate the object in place, rather than around the worldpsace origin", () => {
                let worldspaceOrigin = new Point(0, 0, 0)
                let rotationDegrees = 180
                let objectLocation = new Point(200, 200, 200);
                let object = new WorldObject(objectLocation, worldpsace)

                object.mesh = new CuboidMesh(
                    object, 
                    worldpsace.camera,
                    {
                        scale: new Vector(1, 1, 1),
                        color: Color.RED
                    }
                );
                object.rotate("y", rotationDegrees, worldspaceOrigin);

                const firstVertice: Point = object.mesh.vertices[0];
                expect(firstVertice.x).toBeCloseTo(200.5);
                expect(firstVertice.y).toBeCloseTo(199.5);
                expect(firstVertice.z).toBeCloseTo(200.5);
            })
         })
    })
})