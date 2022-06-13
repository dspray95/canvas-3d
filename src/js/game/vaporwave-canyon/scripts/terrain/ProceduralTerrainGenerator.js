import Point from "../../../../engine/rendering/objects/primitives/Point";
import Vector from "../../../../engine/rendering/objects/primitives/Vector";
import { Vector2D } from "../../../../engine/rendering/objects/primitives/Vector2D";
import { Color } from "../../../../tools/Colors";
import { Terrain } from "../../game-objects/world/Terrain";
import { BehaviourScript } from "../BehaviourScript";

class TerrainGenerator extends BehaviourScript {

  constructor(parent, 
              worldpsaceTerrainObjects, 
              cameraPosition,
              terrainConfig,
              chunkLoadEvent){
    super()
    this.parent = parent
    this.terrainObjects = worldpsaceTerrainObjects    
    this.cameraPos = cameraPosition
    this.previousCameraPosition = cameraPosition.copy()
    this.nTerrainObjectsCreated = 0
    this.prevChunk = null
    
    //Terrain config
    this.config = terrainConfig
    this.terrainInitPos = new Point(...this.config.initPosXYZ)    
    this.terrainColor = new Color(...this.config.colorRGB)
    this.chunkLoadEvent = chunkLoadEvent
    
    //create initial terrain chunks           
    for(let i = 0; i < this.config.maxChunks; i++){
      this.loadNextChunk()  
    }
    this.canCreateNextTerrain = true
  }

  loadNextChunk(){
    let newPos = new Point(
        this.terrainInitPos.x, 
        this.terrainInitPos.y,
        this.terrainInitPos.z + (((this.config.sizeY - 1) * this.nTerrainObjectsCreated))
    )

    let terrain = new Terrain(
      newPos, //location
      this.parent, //parent
      `terrain: ${this.nTerrainObjectsCreated}`, //name
      this.config.sizeX, //width
      this.config.sizeY, //height
      this.config.noise.scale, //noise scale
      this.config.noise.octaves, //octaves
      this.config.noise.persistance, //persistance
      this.config.noise.lacunarity, //lacunarity
      this.config.noise.seed, //seed
      new Vector2D(0, this.config.sizeY * this.nTerrainObjectsCreated), //octave offset
      this.config.heightMultiplier, //height multiplier
      this.terrainColor, 
      // Color.random(),
      this.terrainObjects[0]
    )
    this.terrainObjects.unshift(terrain)
    this.nTerrainObjectsCreated++
    terrain.mesh.drawWireframe = true

    this.prevChunk = terrain  


    return terrain
  }
  
  execute(){
    if(
      this.cameraPos.z > this.terrainObjects[this.terrainObjects.length - 1].centrePos.z 
      && this.canCreateNextTerrain
    ){
      this.loadNextChunk()
      this.chunkLoadEvent.trigger()
      this.canCreateNextTerrain = false
    } 
    if(
      this.cameraPos.z > 
      this.terrainObjects[this.terrainObjects.length - 1].centrePos.z + 
      this.config.sizeY * 0.5 && !this.canCreateNextTerrain
    ){
      this.terrainObjects.pop()
      this.canCreateNextTerrain = true
    }

  }
}

export { TerrainGenerator }