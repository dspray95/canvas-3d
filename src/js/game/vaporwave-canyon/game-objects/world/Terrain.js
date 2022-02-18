import { isCompositeComponent } from "react-dom/test-utils";
import { Matrix } from "../../../../engine/matrix-rendering/Matrix";
import { BasicMesh } from "../../../../engine/matrix-rendering/meshes/Mesh";
import WorldObject from "../../../../engine/objects/WorldObject"
import Point from "../../../../engine/rendering/rendering-objects/primitives/Point";
import Vector from "../../../../engine/rendering/rendering-objects/primitives/Vector";
import { FlatShading } from "../../../../engine/rendering/shader/FlatShading";
import { TerrainShader } from "../../../../engine/rendering/shader/TerrainShader";
import { Color } from "../../../../tools/Colors";
import { TerrainNoise } from "../../scripts/noise/TerrainNoise";

class Terrain extends WorldObject{

  constructor(
    location, 
    parent, 
    name="Terrain", 
    mapWidth, 
    mapHeight, 
    noiseScale,
    octaves, 
    persistance, 
    lacunarity,
    seed, 
    octaveOffset, 
    heightMultiplier, 
    terrainColor,
    doSpawnAnim=true,
    lastPointsRowOfPrevious){
    super(location, parent, name);
    
    const heightMap = TerrainNoise.generateNoiseMap(
      mapWidth, 
      mapHeight, 
      noiseScale,
      octaves, 
      persistance, 
      lacunarity, 
      seed, 
      octaveOffset,
      heightMultiplier,
    )
    


    let terrainMesh = this.genTerrainMesh(
      mapWidth, 
      mapHeight, 
      heightMap,
      heightMultiplier,
      lastPointsRowOfPrevious
    );
    this.mesh = new BasicMesh(
      this.location.matrix,
      terrainMesh.vertices,
      terrainMesh.triangles
    )
    this.doSpawnAnim = doSpawnAnim
    this.opacity = 1
    if (doSpawnAnim){
      this.opacity = 0
    }
  }

  genTerrainMesh(width, height, heightmap, heightMultiplier, firstRowPointsOfPrevious){
    let triangles = []
    let vertices = []
    const topLeftX = (width-1) / -2
    const topLeftY = (height-1) / 2

    let vertexIndex = 0
    let x2 = width - width * 0.5 - 2
    for(let y = 0; y < height; y++){
      for(let x = 0; x < width; x++){

        let p = [
          [topLeftX + x * 1.5],
          [heightmap[y][x] * heightMultiplier],
          [topLeftY - y],
          [1]
        ]
        //v0 ends up in the top left, rather than the bottom left. Spinning it around works for now...
        p = Matrix.rotate(p, "y", 3.14) 
        
        // Stretch out the terrain so it fills more of the camera viewport without making 
        // the canyon wider
        // if(x < width / 2 - 2){
        //   p[0][0] -= (width / 2 - 2) - x - 1
        // } 
        // else if (x > width / 2 + 2){
        //   p[0][0] += (x - 1 - (width / 2 + 1))
        // }


        vertices.push(p)
        //Make triangle
        if (x < width - 1 && y < height - 1){
            triangles.push([
              vertexIndex + width, 
              vertexIndex + width + 1,
              vertexIndex
            ])
            //Triangle B
            triangles.push([
              vertexIndex + 1,
              vertexIndex,
              vertexIndex + width + 1
            ])
        }
        vertexIndex++;      
      }
    }
    return {vertices: vertices, triangles: triangles}
  }

  copyFirstRowPoints(width, height){
    let firstRow = this.mesh.points.slice(0, width)
    let output = []
    firstRow.forEach(point => {
      let copiedPoint = point.copy()
      copiedPoint.subtract(new Vector(this.location.x, this.location.y, this.location.z))
      output.push(copiedPoint)
    })
    
    return output
  }

  drawPerspective(ctx, camera) {
    this.mesh.draw(ctx, camera, this.opacity)
  }

  tick(){
    if (this.doSpawnAnim){
      if(this.opacity < 1){
        this.opacity += 0.01
      }
    }
    this.scripts.forEach(script => {
      script.execute()
    })
  }
}

export { Terrain }