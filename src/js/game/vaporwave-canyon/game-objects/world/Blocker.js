import WorldObject from "../../../../engine/objects/WorldObject";

class Blocker extends WorldObject{
    constructor(location, parent){
        super(location, parent, "blocker")
    }

    genMesh(width, height, depth){
        let xOffset = width * 0.5;
        let yOffset = height * 0.5;
        let zOffset = depth * 0.5;
        
        let points = [
            new Point(-xOffset, -yOffset, -zOffset),
            new Point(xOffset, -yOffset, -zOffset),
            new Point(-xOffset, -yOffset, zOffset),
            new Point(xOffset, -yOffset, zOffset),
            new Point(-xOffset, yOffset, -zOffset),
            new Point(xOffset, yOffset, -zOffset),
            new Point(-xOffset, yOffset, zOffset),
            new Point(xOffset, yOffset, zOffset)
        ]

        let triangles = [
            [1, 0, 2],
            [0, 3, 2],
            [0, 1, 4],
            [1, 5, 4],
            [1, 2, 6],
            [1, 6, 5],
            [0, 7, 3],
            [0, 4, 7],
            [4, 5, 6],
            [4, 6, 7],
            [2, 3, 7],
            [2, 7, 6]
          ]

          return [points, triangles]
        }
}

export { Blocker }