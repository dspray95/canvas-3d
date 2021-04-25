import { Vector2D } from "../../../engine/physics/vector/Vector2D";
import Vector from "../../../engine/rendering/objects/primitives/Vector";
import { Color } from "../../../tools/Colors";
import { TerrainNoise } from "./noise/TerrainNoise";

class NoiseToCanvas{

  constructor(){
    let seed = 500
    let persistance = 0.2
    let lacunarity = 1.87
    let scale = 50
    let octaves = 5
    this.chunkSize = 248
    this.noiseMap = TerrainNoise.generateNoiseMap(
      this.chunkSize,
      this.chunkSize, 
      scale, 
      octaves,
      persistance,
      lacunarity,
      seed,
      new Vector2D(0, this.chunkSize*3)
    )
    this.noiseMap2 = TerrainNoise.generateNoiseMap(
      this.chunkSize,
      this.chunkSize, 
      scale, 
      octaves,
      persistance,
      lacunarity,
      seed,
      new Vector2D(0, this.chunkSize*4)
    )
    this.noiseMap3 = TerrainNoise.generateNoiseMap(
      this.chunkSize,
      this.chunkSize, 
      scale, 
      octaves,
      persistance,
      lacunarity,
      seed,
      new Vector2D(0, this.chunkSize*5)
    )
  }

  draw(ctx){
    let noiseMap = this.noiseMap
    let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    var dataArr = imgData.data

    for(let y = 0; y < 248; y++){
      for(let x = 0; x < 248; x++){
        let dataIdx = 4 * (y + ctx.canvas.height/2) * ctx.canvas.width + 4 * (x + ctx.canvas.width)
        dataArr[dataIdx] = noiseMap[y][x] * 255
        dataArr[dataIdx + 1] = noiseMap[y][x] * 255
        dataArr[dataIdx + 2] = noiseMap[y][x] * 255
        dataArr[dataIdx + 3] = 255
      }
    }

    for(let y = 0; y < 248; y++){
      for(let x = 0; x < 248; x++){       
        let dataIdx = 4 * (y - this.chunkSize + ctx.canvas.height/2) * ctx.canvas.width + 4 * (x + ctx.canvas.width)
        dataArr[dataIdx] = this.noiseMap2[y][x] * 255
        dataArr[dataIdx + 1] = this.noiseMap2[y][x] * 255
        dataArr[dataIdx + 2] = this.noiseMap2[y][x] * 255
        dataArr[dataIdx + 3] = 255
      }
    }

    for(let y = 0; y < 248; y++){
      for(let x = 0; x < 248; x++){
        
        let dataIdx = 4 * (y - (this.chunkSize*2) + ctx.canvas.height/2) * ctx.canvas.width + 4 * (x + ctx.canvas.width)
        dataArr[dataIdx] = this.noiseMap3[y][x] * 255
        dataArr[dataIdx + 1] = this.noiseMap3[y][x] * 255
        dataArr[dataIdx + 2] = this.noiseMap3[y][x] * 255
        dataArr[dataIdx + 3] = 255
      }
    }

    ctx.putImageData(imgData, 0, 0)
  }

}

export { NoiseToCanvas } 