import Point from "../primitives/Point"

class MeshData{

    vertices: Array<Point>
    triangles: Array<Array<number>>

    constructor(vertices: Array<Point>, triangles: Array<Array<number>>){
        this.vertices = vertices
        this.triangles = triangles
    }
    
}

export { MeshData }