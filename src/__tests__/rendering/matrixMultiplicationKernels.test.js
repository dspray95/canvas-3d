import { dynamicKernel4x4dotNx1x4, kernel4x4dot1x4, kernel4x4dotListOf1x4 } from "../../js/engine/rendering/gpu/MatrixMultiplicationKernels"

test("multiplyMatrices", () => {
    let matrixA = [
        [2, 2, 2, 1], 
        [2, 2, 2, 1],
        [2, 2, 2, 1],
        [2, 2, 2, 1]
    ]
    let matrixB = [[5], [10], [15], [2]]
    let expectedOutput = [
        new Float32Array([62]),
        new Float32Array([62]),
        new Float32Array([62]),
        new Float32Array([62])        
    ]

    let output = kernel4x4dot1x4(matrixA, matrixB)

    expect(output).toEqual(expectedOutput)
})

test("multiplyListOfMatrices", () => {
    let matrixA = [
        [2, 2, 2, 1], 
        [2, 2, 2, 1],
        [2, 2, 2, 1],
        [1, 1, 1, 1]
    ]
    let matrixB = [
        [[5], [10], [15], [2]],
        [[2], [2], [2], [2]],
        [[5], [5], [9], [8]],
        [[5064], [99], [100], [590]],
    ]

    let expectedOutput = [
        [
            new Float32Array([62]),
            new Float32Array([62]),
            new Float32Array([62]),
            new Float32Array([32])        
        ],
        [
            new Float32Array([14]),
            new Float32Array([14]),
            new Float32Array([14]),
            new Float32Array([8])        
        ],
        [
            new Float32Array([46]),
            new Float32Array([46]),
            new Float32Array([46]),
            new Float32Array([27])        
        ],
        [
            new Float32Array([11116]),
            new Float32Array([11116]),
            new Float32Array([11116]),
            new Float32Array([5853])        
        ]
    ]

    let output = kernel4x4dotListOf1x4(matrixA, matrixB)

    expect(output).toEqual(expectedOutput)
})

test("multiplyDynamicListOfMatrices", () => {
    let matrixA = [
        [2, 2, 2, 1], 
        [2, 2, 2, 1],
        [2, 2, 2, 1],
        [1, 1, 1, 1]
    ]
    let matricSetA = [
        [[5], [10], [15], [2]]
    ]
    let matrixSetB = [
        [[2], [2], [2], [2]],
        [[5], [5], [9], [8]],
        [[5064], [99], [100], [590]],
    ]

    let expectedOutputA = [
        [
            new Float32Array([62]),
            new Float32Array([62]),
            new Float32Array([62]),
            new Float32Array([32])        
        ]
    ]
    let expectedOutputB = [
        [
            new Float32Array([14]),
            new Float32Array([14]),
            new Float32Array([14]),
            new Float32Array([8])        
        ],
        [
            new Float32Array([46]),
            new Float32Array([46]),
            new Float32Array([46]),
            new Float32Array([27])        
        ],
        [
            new Float32Array([11116]),
            new Float32Array([11116]),
            new Float32Array([11116]),
            new Float32Array([5853])        
        ]
    ]
    
    dynamicKernel4x4dotNx1x4.setOutput([1, 4, 1])
    let outputA = dynamicKernel4x4dotNx1x4(matrixA, matricSetA)
    dynamicKernel4x4dotNx1x4.setOutput([1, 4, 3])
    let outputB = dynamicKernel4x4dotNx1x4(matrixA, matrixSetB)

    expect(outputA).toEqual(expectedOutputA)
    expect(outputB).toEqual(expectedOutputB)
})