import { RGBA, colors} from "../../../tools/Colors"
import Primitive from "./Primitives";
import { Point } from "../Point";
import { randomIntRange } from "../../../tools/Random";

class Cuboid extends Primitive {
  constructor(location, parent, name="Cuboid") {
    super(location, parent, name=name);
    let cube = this.createCube(20, 20, 20);
    this.points = cube["vertices"];
    this.edges = cube["edges"];
    this.lines = cube["lines"]
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

    let edges = [
      [0, 1, 2, 3, 0],
      [4, 5, 6, 7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];
    let lines = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7]
    ]

    return { vertices: cuboid, edges: edges, lines: lines };
  }
}

class StaticRotatedCuboid extends Cuboid{
  constructor(location, parent, angle, name="StaticRotatingCuboid"){
    super(location, parent, name=name);
    this.verticeColor = colors.green;
    this.logPerspectivePos = true;
    this.points.forEach((point) => {
      point.rotate("x", angle * (Math.PI / 180))
      point.rotate("y", angle * (Math.PI / 180))
    })
  }
}


class RotatingCuboid extends Cuboid {
  constructor(location, parent) {
    super(location, parent);
    this.verticeColor = colors.pink
    this.points.forEach((point) => {
      // point.translate(200, 0, 0);
      point.rotate("y", 45 * (Math.PI / 180));
      // point.scale(2, 2, 0);
      // console.log(point.matrix);
    });
  }

  tick() {
    this.points.forEach((point) => {
      point.rotate("y", 1 * (Math.PI / 180))
      point.rotate("z", 1 * (Math.PI / 180))
      point.rotate("x", 1 * (Math.PI / 180))
    })
  }
}

class WanderingCuboid extends Cuboid {
  constructor(location, parent, speed) {
    super(location, parent)
    this.verticeColor = colors.pink;
    this.direction = [1, 0, 0]
    this.speed = speed
  }

  tick() {
    if (Math.random() < 0.05){
      let direction = randomIntRange(0, 2)
      switch(direction){
        case 0:
          this.direction = [this.speed, randomIntRange(-this.speed, this.speed), randomIntRange(-this.speed, this.speed)];
          break;
        case 1:
          this.direction = [randomIntRange(-this.speed, this.speed), this.speed, randomIntRange(-this.speed, this.speed)];
          break;
        case 2:
          this.direction = [randomIntRange(-this.speed, this.speed), randomIntRange(-this.speed, this.speed), this.speed];
          break;
        default:
          this.direction = [0, 0, 0]
      }
    }

    this.points.forEach((point) => {
      // console.log(this.direction)
      point.translate(this.direction[0], this.direction[1], this.direction[2])
    })
  }
}

export { Cuboid, RotatingCuboid, WanderingCuboid as MovingCuboid, StaticRotatedCuboid };
