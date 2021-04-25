import { Color } from "../../../../tools/Colors"
import WorldObject from "../WorldObject";
import Point from "../../../rendering/objects/primitives/Point";
import { randomIntRange } from "../../../../tools/Random";
import Line from "../../../rendering/objects/primitives/Line";
import Vector from "../../../rendering/objects/primitives/Vector";
import Mesh from "../../../rendering/objects/mesh/Mesh";

class Cuboid extends WorldObject {
  constructor(location, parent, name="Cuboid") {
    super(location, parent, name=name);
    let cube = this.createCube(10, 10, 10);
    this.mesh = new Mesh(this, parent.camera, cube['vertices'], cube['triangles'], true, false, false)
    this.mesh.triangles.forEach(triangle => {
      triangle.color = Color.DEFAULTS.blue;
    })
  }

  createCube(cuboidWidth, cuboidHeight, cuboidLength) {
    let xOffset = cuboidWidth * 0.5;
    let yOffset = cuboidHeight * 0.5;
    let zOffset = cuboidLength * 0.5;

    let botLeft = new Point(-xOffset, -yOffset, -zOffset);
    let botRight = new Point(xOffset, -yOffset, -zOffset);
    let botLeftBack = new Point(-xOffset, -yOffset, zOffset);
    let botRightBack = new Point(xOffset, -yOffset, zOffset);
    let topLeft = new Point(-xOffset, yOffset, -zOffset);
    let topRight = new Point(xOffset, yOffset, -zOffset);
    let topLeftBack = new Point(-xOffset, yOffset, zOffset);
    let topRightBack = new Point(xOffset, yOffset, zOffset);

    let cuboid = [
      topLeft,
      topRight,
      topRightBack,
      topLeftBack,
      botLeft,
      botRight,
      botRightBack,
      botLeftBack,
    ];

    let faces = [
      [0, 1, 2, 3],
      [0, 1, 5, 4],
      [4, 5, 6, 7],
      [7, 6, 2, 3],
      [0, 3, 7, 4],
      [1, 2, 6, 5]
    ]

    let triangles = [
      //Bottom
      [1, 0, 2],
      [0, 3, 2],
      //Front
      [0, 1, 4],
      [1, 5, 4],
      //Right
      [1, 2, 6],
      [1, 6, 5],
      //Left
      [0, 7, 3],
      [0, 4, 7],
      //Top
      [4, 5, 6],
      [4, 6, 7],
      //Back
      [2, 3, 7],
      [2, 7, 6]
    ]
    
    let color = Color.DEFAULTS[Object.keys(Color.DEFAULTS)[randomIntRange(0, 9)]]
    let faceColors = []
    for(let i = 0; i < 6; i++){
      faceColors.push(color)
    }
    this.faceColors = faceColors
    return { vertices: cuboid, faces: faces, triangles: triangles };
  }
}

class RotatingCuboid extends Cuboid {
  constructor(location, parent, rotations, speed) {
    super(location, parent);
    this.speed = speed
    this.rotations = rotations
  }

  tick(){
    this.rotations.forEach(rotation => {
      this.rotate(rotation, 1 * this.speed)
    })
  }
    // tick() {
    //   this.points.forEach((point) => {
    //     point.subtract(new Vector(this.location.x, this.location.y, this.location.z))
    //     point.rotate("y", 1 * (Math.PI / 180))
    //     point.rotate("z", 1 * (Math.PI / 180))
    //     point.rotate("x", 1 * (Math.PI / 180))
    //     point.add(new Vector(this.location.x, this.location.y, this.location.z))
    //   })
    // }
}

export { Cuboid, RotatingCuboid };
