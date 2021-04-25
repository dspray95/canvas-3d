import WorldObject from "../WorldObject";
import Point from "../primitives/Point";
import Mesh from "./Mesh";
import { Color } from "../../../tools/Colors"

class Plane extends WorldObject{

  constructor(location, parent, name="Plane") {
    super(location, parent, name=name);
    let plane = this.createPlane(5, 5, 60);
    this.mesh = new Mesh(this, parent.camera, plane['vertices'], plane['triangles'], true, false, true)
    this.mesh.triangles.forEach(triangle => {
      triangle.color = Color.WHITE;
    })
  }

  createPlane(width, height, scale) {

    let triangles = []
    let vertices = []
    let vertexIndex = 0
    let topLeftX = (width-1) / -2;
    let topLeftZ = (height-1) / 2
    // console.log("n verts")
    // console.log(width * height)
    // console.log("n tris")
    // console.log((width-1) * (height -1) * 6)
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
          vertices.push(new Point((topLeftX + x)*scale, 0, (topLeftZ - y)*scale))

          if(x < width-1 && y < height-1) {
            //plane triangle A
            triangles.push([
              vertexIndex + width,
              vertexIndex + width + 1,
              vertexIndex,
            ])
            //plane triangle B
            triangles.push([
              vertexIndex + 1,
              vertexIndex,
              vertexIndex + width + 1,
            ])
          }

          vertexIndex++;
      }
    }
    // console.log(triangles)
    // console.log(vertices)
    return { vertices: vertices, triangles: triangles };
  }
}

export { Plane };