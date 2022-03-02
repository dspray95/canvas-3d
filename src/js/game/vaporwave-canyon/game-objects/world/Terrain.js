import { isCompositeComponent } from "react-dom/test-utils";
import WorldObject from "../../../../engine/objects/WorldObject"
import Mesh from "../../../../engine/rendering/objects/mesh/Mesh";
import Point from "../../../../engine/rendering/objects/primitives/Point";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
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
      adjacentTerrain
    ){
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
      adjacentTerrain
    );
    
    this.mesh = new Mesh(
      this,
      parent.camera, 
      terrainMesh['vertices'], 
      terrainMesh['triangles'], 
      true, false, false,
      TerrainShader,
      terrainColor,
      mapWidth,
      mapHeight
    )

    this.width = mapWidth
    this.height = mapHeight
    this.setMeshColors(this.mesh.triangles, this.width, terrainColor)
    this.adjacentTerrain = adjacentTerrain
    this.centrePos = this.location.copy()
    this.centrePos.add(new Vector(this.width, 0, this.height))
  }

  genTerrainMesh(width, height, heightmap, heightMultiplier, adjacentTerrain){
    let triangles = []
    let vertices = []
    const topLeftX = (width-1) / -2
    const topLeftY = (height-1) / 2

    let vertexIndex = 0

    for(let y = 0; y < height; y++){
      for(let x = 0; x < width; x++){
        let p = new Point(
          (topLeftX + x), 
          heightmap[y][x] * heightMultiplier, 
          (topLeftY - y)
        )
        p.rotate("y", 3.14159)  
        vertices.push(p)
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
    if(adjacentTerrain != null){
      //Modify Y val at the start of this terrain chunk to the Y vals from the end of the adjacent terrain chunk
      this.setStartHeightsToAdjacent(adjacentTerrain, vertices, width, height)
    }

    return {vertices: vertices, triangles: triangles}
  }

  setStartHeightsToAdjacent(adjacentTerrain, vertices, width, height){
    let iAdjacent = vertices.length - width
    for(let i = 0; i < width - 1; i++){
        vertices[i].y = adjacentTerrain.mesh.points[iAdjacent].y
        vertices[i].updateMatrix()
        iAdjacent += 1
    }
  }

  setMeshColors(triangles, width, terrainColor){
    let nTrisInRow = width * 2 - 2
    let valleyLeft = nTrisInRow * 0.5 - 4 
    let valleyRight = nTrisInRow * 0.5 + 3

    let fillOpacity = 0
    let wireframeOpacity = 0
    for(let i = 0; i < triangles.length; i++){

      triangles[i].fillColor = terrainColor.copy()
      triangles[i].wireframeColor = Color.PINK.copy()

      if(i % nTrisInRow > valleyLeft && i % nTrisInRow < valleyRight ){
        triangles[i].fillColor = triangles[i].wireframeColor
      } 
      else if(i % nTrisInRow < 10){
        fillOpacity += 0.05
        wireframeOpacity +=  0.05
        triangles[i].fillColor.opacity = fillOpacity
        triangles[i].wireframeColor.opacity = wireframeOpacity
      }
      else if(i % nTrisInRow > nTrisInRow - 11){
        fillOpacity -= 0.05
        wireframeOpacity -=  0.05
        triangles[i].fillColor.opacity = fillOpacity
        triangles[i].wireframeColor.opacity = wireframeOpacity
      } 
      else {
        triangles[i].fillColor.opacity = 0.5
        triangles[i].wireframeColor.opacity = 1
      }

      triangles[i].fillColor = triangles[i].fillColor.toHtmlRgba()
      triangles[i].wireframeColor = triangles[i].wireframeColor.toHtmlRgba()

    }
  }

  drawPerspective(ctx, camera) {
    this.mesh.draw(ctx, camera, this.opacity, this.adjacentTerrain)
    // TerrainShader.drawVertLabels(ctx, this.mesh.points, this.width, this.name, this.terrainColor)
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