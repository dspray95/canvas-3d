import { gpuInterface } from "./GPU";

const gpu = gpuInterface.getGPU()

const kernel4x4dot1x4 = gpu.createKernel(function(a, b) {
    let sum = 0;
    for (let i = 0; i < 4; i++) {
        sum += a[this.thread.y][i] * b[i][this.thread.x];
    }
    return sum;
}).setOutput([1, 4])

const kernel4x4dot4x1x4 = gpu.createKernel(function(a, b) {
    let sum = 0;
    for (let i = 0; i < 4; i++) {
        sum += a[this.thread.y][i] * b[this.thread.z][i][this.thread.x];
    }
    return sum;
}).setOutput([1, 4, 4])


const dynamicKernel4x4dotNx1x4 = gpu.createKernel(function(a, b) {
    let sum = 0;
    for (let i = 0; i < 4; i++) {
        sum += a[this.thread.y][i] * b[this.thread.z][i][this.thread.x];
    }
    return sum;
}).setDynamicOutput(true).setDynamicArguments(true)

export { kernel4x4dot1x4, kernel4x4dot4x1x4 as kernel4x4dotListOf1x4, dynamicKernel4x4dotNx1x4 }