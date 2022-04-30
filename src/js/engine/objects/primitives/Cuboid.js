import Point from "../../rendering/objects/primitives/Point";
import { MeshDefaults } from "../../rendering/objects/mesh/MeshDefaults";
import { MeshData } from "../../rendering/objects/mesh/MeshData";
import { Mesh } from "../../rendering/objects/mesh/Mesh";
import { Vector } from "../../rendering/objects/primitives/Vector";

class CuboidMesh extends Mesh {

  constructor(
    parent, 
    camera, {
      scale=new Vector(1, 1, 1),
      color=MeshDefaults.planeColor
    }
  ) {
    let meshData = CuboidMesh.createCuboidMeshData(scale)
    super(
      parent,
      camera, 
      meshData,
      {
        color: color
      }
    );  
  }

  static createCuboidMeshData(cuboidScale){
    let xOffset = cuboidScale.x * 0.5;
    let yOffset = cuboidScale.y * 0.5;
    let zOffset = cuboidScale.z * 0.5;
    
    let vertices = [
        new Point(-xOffset, -yOffset, -zOffset),
        new Point(xOffset, -yOffset, -zOffset),
        new Point(-xOffset, -yOffset, zOffset),
        new Point(xOffset, -yOffset, zOffset),
        new Point(-xOffset, yOffset, -zOffset),
        new Point(xOffset, yOffset, -zOffset),
        new Point(-xOffset, yOffset, zOffset),
        new Point(xOffset, yOffset, zOffset)
    ]

    let triangles = [
        [0, 4, 1],
        [1, 4, 5],
        [0, 2, 4],
        [4, 2, 6],
        [2, 3, 7],
        [2, 7, 6],
        [3, 1, 7],
        [7, 1, 5],
        [1, 2, 0],
        [3, 2, 1],
        [5, 7, 6],
        [5, 6, 4]
      ]

      return new MeshData(vertices, triangles)
  }

}

export { CuboidMesh };
