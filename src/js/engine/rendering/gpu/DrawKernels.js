import { gpuInterface } from "./GPU";

const gpu = gpuInterface.getGPU()
const SCREEN_WIDTH = 1920
const SCREEN_HEIGHT = 1080

const render = gpu.createKernel(function() {
    this.color(255, 255, 255, 1);
})
  .setOutput([1920, 1080])
  .setGraphical(true);


export { render }