import ParticleHandler from "./ParticleHandler";
import { Particle } from "../Particle";
import { Coordinate3D } from "../../Coordinate";
import { colors } from "../../../tools/Colors";
import { createRenderer } from "react-dom/test-utils";

export default class Cuboid extends ParticleHandler {
  constructor(
    location,
    cuboidWidth,
    cuboidHeight,
    cuboidLength,
    boundsWidth,
    boundsHeight,
    perspective,
    projectionCentreX,
    projectionCentreY
  ) {
    super(0, boundsWidth, boundsHeight);
    let cuboid = this.createCuboid(cuboidWidth, cuboidHeight, cuboidLength);
    this.particles = cuboid.cube;
    this.edges = cuboid.edges;

    this.projectionCentreX = projectionCentreX;
    this.projectionCentreY = projectionCentreY;
    this.perspective = perspective;
    this.location = location;
    this.movingLeft = true;
    this.movingUp = true;
    this.movingBack = true;
    this.lowerBoundX = -(this.width * 0.5);
    this.upperBoundX = this.width - this.width * 0.5;
    this.lowerBoundY = -(this.height * 0.5);
    this.upperBoundY = this.height - this.height * 0.5;
    this.lowerBoundZ = -(this.width * 0.5);
    this.upperBoundZ = this.width - this.width * 0.5;
    this.cuboidWidth = cuboidWidth;
    this.cuboidHeight = cuboidHeight;
    this.cuboidLength = cuboidLength;
  }

  tick() {
    let yMovement = 0;
    let xMovement = 0;
    let zMovement = 0;

    if (this.movingLeft) {
      xMovement = -5;
    } else {
      xMovement = 5;
    }
    if (this.movingUp) {
      yMovement = -5;
    } else {
      yMovement = 5;
    }
    if (this.movingBack) {
      zMovement = -5;
    } else if (this.moveingBack == false) {
      zMovement = 5;
    }

    this.location.add(new Coordinate3D(xMovement, yMovement, zMovement, true));
    if (this.location.x < this.lowerBoundX + this.cuboidWidth * 2) {
      this.movingLeft = false;
    } else if (this.location.x > this.upperBoundX - this.cuboidWidth * 2) {
      this.movingLeft = true;
    }
    if (this.location.y < this.lowerBoundY + this.cuboidHeight) {
      this.movingUp = false;
    } else if (this.location.y > this.upperBoundY - this.cuboidHeight) {
      this.movingUp = true;
    }
    if (this.location.z < this.lowerBoundZ + this.cuboidLengt) {
      this.movingBack = false;
    } else if (this.location.z > this.upperBoundZ - this.cuboidLength) {
      this.movingBack = true;
    }
  }

  draw(ctx, width) {
    let centrePoint = new Particle(10, this.location, colors.yellow, this);
    centrePoint.project(
      new Coordinate3D(0, 0, 0),
      this.perspective,
      this.projectionCentreX,
      this.projectionCentreY
    );
    ctx.fillStyle = centrePoint.rectColor;
    ctx.fillRect(
      centrePoint.xProjected - centrePoint.size + this.location.x,
      centrePoint.yProjected - centrePoint.size + this.location.y,
      centrePoint.size * 2 * centrePoint.scaleProjected,
      centrePoint.size * 2 * centrePoint.scaleProjected
    );

    this.particles.forEach((particle) => {
      particle.project(
        this.location,
        this.perspective,
        this.projectionCentreX,
        this.projectionCentreY
      );
      // We define the opacity of our element based on its distance
      // ctx.globalAlpha = Math.abs(1 - particle.location.z / width);
      // We draw a rectangle based on the projected coordinates and scale

      ctx.fillStyle = particle.rectColor;
      ctx.globalAlpha = Math.abs(1 - particle.location.z / width);

      ctx.fillRect(
        particle.xProjected - particle.size + this.location.x,
        particle.yProjected - particle.size + this.location.y,
        particle.size * 2 * particle.scaleProjected,
        particle.size * 2 * particle.scaleProjected
      );
    });
    this.drawEdges(ctx);
  }

  drawEdges(ctx) {
    this.edges.forEach((edge) => {
      ctx.beginPath();
      let currentLocation = this.particles[edge[0]];
      ctx.moveTo(
        currentLocation.xProjected + this.location.x,
        currentLocation.yProjected + this.location.y
      );
      for (let i = 1; i < edge.length; i++) {
        currentLocation = this.particles[edge[i]];
        ctx.lineTo(
          currentLocation.xProjected + this.location.x,
          currentLocation.yProjected + this.location.y
        );
      }
      ctx.strokeStyle = `rgba(${colors.yellow})`;
      ctx.stroke();
    });
  }

  createCuboid(cuboidWidth, cuboidHeight, cuboidLength) {
    let xOffset = cuboidWidth * 0.5;
    let yOffset = cuboidHeight * 0.5;
    let zOffset = cuboidLength * 0.5;

    let botLeft = new Coordinate3D(-xOffset, -yOffset, -zOffset);
    let botRight = new Coordinate3D(xOffset, -yOffset, -zOffset);
    let botLeftBack = new Coordinate3D(-xOffset, -yOffset, zOffset);
    let botRightBack = new Coordinate3D(xOffset, -yOffset, zOffset);
    let topLeft = new Coordinate3D(-xOffset, yOffset, -zOffset);
    let topRight = new Coordinate3D(xOffset, yOffset, -zOffset);
    let topLeftBack = new Coordinate3D(-xOffset, yOffset, zOffset);
    let topRightBack = new Coordinate3D(xOffset, yOffset, zOffset);

    let cube = [
      new Particle(10, topLeft, colors.blue, this),
      new Particle(10, topRight, colors.blue, this),
      new Particle(10, topRightBack, colors.blue, this),
      new Particle(10, topLeftBack, colors.blue, this),
      new Particle(10, botLeft, colors.blue, this),
      new Particle(10, botRight, colors.blue, this),
      new Particle(10, botRightBack, colors.blue, this),
      new Particle(10, botLeftBack, colors.blue, this),
    ];

    let edges = [
      [0, 1, 2, 3, 0],
      [4, 5, 6, 7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];

    return { cube: cube, edges: edges };
  }
}
