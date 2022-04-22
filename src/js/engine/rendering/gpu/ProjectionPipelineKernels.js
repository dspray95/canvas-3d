import { gpuInterface } from "./GPU";

const gpu = gpuInterface.getGPU()

/**Perspective pipeline**/
//Move the point to be relative to (0, 0, 0) by doing:
//  P = cameraToOriginMatrix * point.matrix
//then project this point to perspective view with:
//  Q = perspectiveMatrix * P
//Divide by W
//Move the point from perspecitve space into screen space

const kernelDynamicDivideByW = gpu.createKernel(function(matrices) {
    if(this.thread.y == 3) return matrices[this.thread.z][3][0]
    return matrices[this.thread.z][this.thread.y][0] / matrices[this.thread.z][3][0]
}).setOutput([1, 4, 10000])

const kernelDynamicCameraTransform = gpu.createKernel(function(cameraTransformMatrix, matrices) {
    let sum = 0;
    for (let i = 0; i < 4; i++) {
        sum += cameraTransformMatrix[this.thread.y][i] * matrices[this.thread.z][i][this.thread.x];
    }
    return sum;
}).setOutput([1, 4, 10000])

const kernelDynamicPerspectiveProjection = gpu.createKernel(function(perspectiveMatrix, matrices) {
    let sum = 0;
    for (let i = 0; i < 4; i++) {
        sum += perspectiveMatrix[this.thread.y][i] * matrices[this.thread.z][i][this.thread.x];
    }
    return sum;
}).setOutput([1, 4, 10000])

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

export { superKernelPerspectivePipeline, projectionPipelineSetOutputShape }