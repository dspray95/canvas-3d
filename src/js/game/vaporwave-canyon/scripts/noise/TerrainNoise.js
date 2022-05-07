import { isCompositeComponent } from "react-dom/test-utils";
import { PerlinNoise } from "./PerlinNoise";
import { clamp, inverseLerp } from "../../../../tools/Numbers";
import { PRNG } from "../../../../tools/Random";
import { vectorCrossProduct } from "../../../../engine/rendering/objects/primitives/Vector";
import { Vector2D } from "../../../../engine/rendering/objects/primitives/Vector2D";
import { Noise } from '../../../../../../node_modules/noisejs'



class TerrainNoise{

  static generateNoiseMap(
      width,
      height, 
      noiseScale, 
      octaves, 
      persistance, 
      lacunarity, 
      seed, 
      octaveOffset
    ){
    


    var noise = new Noise(seed);
    
    let noiseMap = []

    if (noiseScale <= 0){
      noiseScale = 0.0001;

    }

    let prng = new PRNG(seed)
    let octaveOffsets = []

    let maxPossibleHeight = 0
    let amplitude = 1;
    let frequency = 1;

    for(let i = 0; i < octaves; i++){
      let offsetX = prng.randomRange(-10000, 10000) + octaveOffset.x
      let offsetY = prng.randomRange(-10000, 10000) - octaveOffset.y
      octaveOffsets.push(new Vector2D(offsetX, offsetY))

      maxPossibleHeight += amplitude
      amplitude *= persistance
    }
    
    let maxNoiseHeight = -999999;
    let minNoiseHeight = 999999;

    let canyonCentre = Math.floor(width/2) - 1
    for (let y = 0; y < height; y++){
      let row = []
      for (let x = 0; x < width; x++){

        amplitude = 1;
        frequency = 1;
        let noiseHeight = 0;
        
        if(x >= canyonCentre - 1 && x <= canyonCentre + 2){
          noiseHeight = 0.5;

        } else{
          for(let i = 0; i < octaves; i++){
            let sampleX = (x + octaveOffsets[i].x) / noiseScale * frequency;
            let sampleY = (y + octaveOffsets[i].y) / noiseScale * frequency

            let perlinVal = noise.perlin2(sampleX, sampleY)

            noiseHeight += perlinVal * amplitude;
            
            amplitude *= persistance;
            frequency *= lacunarity;
          }
        }
        row.push(noiseHeight);
      }
      noiseMap.push(row)
    }

    for (let y = 0; y < height; y++){
      for (let x = 0; x < width; x++){
          //inverseLerp ponly works with a single 
          // noiseMap[y][x] = inverseLerp(minNoiseHeight, maxNoiseHeight, noiseMap[y][x])
          // let normalisedHeight = (noiseMap[y][x] + 1)/ (2 * maxPossibleHeight / 2)
          // noiseMap[y][x] = clamp(normalisedHeight, 0, Math.max)
          
      }
    }
    return noiseMap;
  }
}

export { TerrainNoise }