import { Coordinate3D } from "../../Coordinate";
import { RandomColor } from "../../../tools/Colors";

export default class Primitive {
  constructor(numParticles, boundsWidth, boundsHeight) {
    this.width = boundsWidth;
    this.height = boundsHeight;
    this.depth = boundsWidth;
  }

  tick() {}
}
