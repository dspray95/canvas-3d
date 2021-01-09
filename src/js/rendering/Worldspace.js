import { Camera } from "./Camera";
import { Point } from "./Point";
import { Vector, vectorCrossProduct } from "./Vector";
import { Cuboid, RotatingCuboid, MovingCuboid, StaticRotatedCuboid } from "./objects/Cuboid";
import { ParralaxParticle } from "../particles/Particle";
import CameraController from "../interface/CameraController";

class Worldspace {
  constructor(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode) {
    this.xLim = xLim;
    this.yLim = yLim;
    this.zLim = zLim;
    this.rootLocation = new Point(0, 0, 0);
    this.centre = new Point(xLim * 0.5, yLim * 0.5, zLim * 0, 5);
    // location, viewingDirection, upDirection, fov, near, far

    this.projectionMode = projectionMode;
    this.objects = [
      new Cuboid(new Point(500, 0, -1000), this),
      new Cuboid(new Point(-500, 0, -1000), this),
      new Cuboid(new Point(0, 500, -1000), this),
      new Cuboid(new Point(0, -500, 1000), this),
      new RotatingCuboid(new Point(0, 0, 1000), this),
      new Cuboid(new Point(-250, -250, 1000), this),
      new Cuboid(new Point(-250, 250, -1000), this),
      new Cuboid(new Point(250, -250, -1000), this),
      new Cuboid(new Point(250, 250, -1000), this),
      new StaticRotatedCuboid(new Point(500, 0, 1000), this, 45, "C BEHIND 1"),
      new StaticRotatedCuboid(new Point(-500, 0, 1000), this, 45, "C BEHIND 2"),
      new StaticRotatedCuboid(new Point(500, 0, -1000), this, 45, "C IN FRONT 1"),
      new MovingCuboid(new Point(0, 0, 1000), this),
      new Cuboid(new Point(0, 0, 100), this, "CLIPPER")
      
    ];

    this.camera = this.createMainCamera(
      this.centre,
      viewportWidth,
      viewportHeight
    );
    this.cameraController = new CameraController(this.camera)

    window.addEventListener("keydown", event => {
      if (event.key === "a"){
        this.cameraController.turn("left", 0.001)
        // console.log(v)
      }
      else if (event.key === "d"){
        this.cameraController.turn("right", 0.25)
      }
    })
  }

  createMainCamera(worldCentre, viewportWidth, viewportHeight) {
    let cameraLoc = new Point(0, 0, -50);
    let viewingDirection = cameraLoc
      .getVectorTo(this.objects[4].location)
      .unitLengthVector()
      .viewingDirectionVector();
    // let viewingDirection = new Vector(0.06, 0, -1);
    // let viewingDirection = new Vector(0.47, -0.24, 1).viewingDirectionVector();
    let upDirection = vectorCrossProduct(
      vectorCrossProduct(new Vector(0, 1, 0), viewingDirection),
      viewingDirection
    ).unitLengthVector();

    let fov = 90;
    let near = 1;
    let far = 2000;
    return new Camera(
      this,
      cameraLoc,
      viewingDirection,
      upDirection,
      fov,
      near,
      far,
      viewportWidth,
      viewportHeight
    );
  }

  draw(ctx) {
    this.objects.forEach((primitive) => {
      primitive.tick();
      primitive.drawPerspective(ctx, this.camera);
    });
    // console.log("drawing");
  }
}

export { Worldspace };
