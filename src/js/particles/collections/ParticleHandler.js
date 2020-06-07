import { Particle, ParralaxParticle } from "../Particle";
import { Coordinate3D } from "../../Coordinate";
import { RandomColor } from "../../../tools/Colors";

export default class ParticleHandler {
  constructor(numParticles, boundsWidth, boundsHeight) {
    this.width = boundsWidth;
    this.height = boundsHeight;
    this.depth = boundsWidth;

    let particles = [];
    for (let i = 0; i <= numParticles; i++) {
      let xPos = Math.floor(Math.random() * boundsWidth);
      let yPos = Math.floor(Math.random() * boundsHeight);
      let zPos = Math.floor(Math.random() * boundsWidth);
      let location = new Coordinate3D(xPos, yPos, zPos);
      particles.push(new ParralaxParticle(4, location, RandomColor(), this));
    }
    this.particles = particles;
  }

  tick() {
    this.particles.forEach((particle) => {
      particle.tick();
    });
  }
}
