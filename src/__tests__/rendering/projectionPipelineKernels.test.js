import { projectionPipelineSetOutputShape, superKernelPerspectivePipeline } from "../../js/engine/rendering/gpu/ProjectionPipelineKernels"

test("testProjectionPipelineKernels", () => {
    let cameraTransformMatrix = [
        [2, 2, 2, 1], 
        [2, 2, 2, 1],
        [2, 2, 2, 1],
        [1, 1, 1, 1]
    ]

    let perspectiveMatrix = [
        [2, 0, 0, 0], 
        [0, 2, 0, 0],
        [0, 0, 2, 0],
        [1, 1, 1, 1]
    ]

    let matrices = [
        [[5], [10], [15], [2]],
        [[2], [2], [2], [1]],
        [[8], [8], [8], [5]],
    ]

    let expectedOutput = [
        [
            new Float32Array([0.5688073039054871]),
            new Float32Array([0.5688073039054871]),
            new Float32Array([0.5688073039054871]),
            new Float32Array([218])        
        ],
        [
            new Float32Array([0.5652173757553101]),
            new Float32Array([0.5652173757553101]),
            new Float32Array([0.5652173757553101]),
            new Float32Array([46])        
        ],
        [
            new Float32Array([0.563829779624939]),
            new Float32Array([0.563829779624939]),
            new Float32Array([0.563829779624939]),
            new Float32Array([188])        
        ]
    ]

    projectionPipelineSetOutputShape([1, 4, 3])
    let output = superKernelPerspectivePipeline(cameraTransformMatrix, perspectiveMatrix, matrices)

    expect(output).toEqual(expectedOutput)
})