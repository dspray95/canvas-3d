import { Coordinate3D } from "../Coordinate";

class Particle {
  constructor(
    size = 0,
    location = Coordinate3D(0, 0, 0),
    rectColor = "rgba(0,0,0,0)",
    handler
  ) {
    this.location = location;
    this.rect = [this.location.x, this.location.x + size];
    this.size = size;
    this.rectColor = `rgba(${rectColor})`;
    this.handler = handler;

    this.xProjected = 0; // x coordinate on 2d screen
    this.yProjected = 0; // y coordinate on 2d screen
    this.scaleProjected = 0; // scale of element on 2d screen (further away from camera means smaller scale)
  }

  tick() {}

  project(parentLocation, perspective, projectionCentreX, projectionCentreY) {
    this.scaleProjected = perspective / (perspective + this.location.z);

    this.xProjected =
      (this.location.x + parentLocation.x) * this.scaleProjected +
      projectionCentreX;
    this.yProjected =
      (this.location.y + parentLocation.y) * this.scaleProjected +
      projectionCentreY;
  }

  move(movementVector) {
    this.location.add(movementVector);
  }
}

class ParralaxParticle extends Particle {
  constructor(
    size = 0,
    location = Coordinate3D(0, 0, 0),
    rectColor = "rgba(0,0,0,0)",
    handler
  ) {
    super(size, location, rectColor, handler);
  }

  tick() {
    this.move(new Coordinate3D(1, 0, 0, true));
    if (this.location.x > this.handler.width) {
      this.location = new Coordinate3D(0, this.location.y, this.location.z);
    }
  }
}

export { ParralaxParticle, Particle };
