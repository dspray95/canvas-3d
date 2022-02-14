import { gpuInterface } from "./GPU";

const gpu = gpuInterface.getGPU()
const N_OUTPUT = 600
/**Perspective pipeline**/
//1. Move the point to be relative to (0, 0, 0) by doing:
//  P = cameraToOriginMatrix * point.matrix
//2. then project this point to perspective view with:
//  Q = perspectiveMatrix * P
//3. Divide by W
//4. Move the point from perspecitve space into screen space

const kernelDynamicPerspectiveToScreenSpace = gpu.createKernel(function(perspectiveSpaceMatrices, viewportWidth, viewportHeight) {
    if(this.thread.y == 0) return perspectiveSpaceMatrices[this.thread.z][this.thread.y][0] * viewportWidth + viewportWidth * 0.5
    return perspectiveSpaceMatrices[this.thread.z][this.thread.y][0] * viewportWidth + viewportHeight * 0.5
}).setOutput([1, 2, N_OUTPUT])

const kernelDynamicDivideByW = gpu.createKernel(function(matrices) {
    if(this.thread.y == 3) return matrices[this.thread.z][3][0]
    return matrices[this.thread.z][this.thread.y][0] / matrices[this.thread.z][3][0]
}).setOutput([1, 4, N_OUTPUT])

const kernelDynamicCameraTransform = gpu.createKernel(function(cameraTransformMatrix, matrices) {
    let sum = 0;
    for (let i = 0; i < 4; i++) {
        sum += cameraTransformMatrix[this.thread.y][i] * matrices[this.thread.z][i][this.thread.x];
    }
    return sum;
}).setOutput([1, 4, N_OUTPUT])

const kernelDynamicPerspectiveProjection = gpu.createKernel(function(perspectiveMatrix, matrices) {
    let sum = 0;
    for (let i = 0; i < 4; i++) {
        sum += perspectiveMatrix[this.thread.y][i] * matrices[this.thread.z][i][this.thread.x];
    }
    return sum;
}).setOutput([1, 4, N_OUTPUT])

const superKernelPerspectivePipeline = gpu.combineKernels(
    kernelDynamicDivideByW,
    kernelDynamicPerspectiveProjection, 
    kernelDynamicCameraTransform, 
    function(cameraTransformMatrix, perspectiveMatrix, matrices) {
        return kernelDynamicDivideByW(
            kernelDynamicPerspectiveProjection(
                perspectiveMatrix,
                kernelDynamicCameraTransform(cameraTransformMatrix, matrices)
            )
        )
})

function projectionPipelineSetOutputShape(outputShape){
    kernelDynamicDivideByW.setOutput(outputShape)
    kernelDynamicCameraTransform.setOutput(outputShape)
    kernelDynamicPerspectiveProjection.setOutput(outputShape)
}

export { superKernelPerspectivePipeline, kernelDynamicPerspectiveToScreenSpace, projectionPipelineSetOutputShape }