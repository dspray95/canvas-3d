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
              terrainInitPos,
              terrainSizeX,
              terrainSizeY,
              heightMultiplier,
              terrainColor,
              chunkLoadEvent){
    super()
    this.parent = parent
    this.terrainObjects = worldpsaceTerrainObjects
    this.cameraPos = cameraPosition
    this.previousCameraPosition = cameraPosition.copy()
    //Terrain config
    this.terrainInitPos = terrainInitPos    
    this.chunkSizeX = terrainSizeX
    this.chunkSizeY = terrainSizeY
    this.terrainHeightMultiplier = heightMultiplier
    this.terrainColor = terrainColor
    this.chunkLoadEvent = chunkLoadEvent
    this.nTerrainObjectsCreated = 0
    this.maxTerrainObjects = 5
    this.prevChunk = null
    
    //init           
    for(let i = 0; i < this.maxTerrainObjects; i++){
      this.loadNextChunk()  
    }
    this.canCreateNextTerrain = true
  }

  loadNextChunk(){
    let newPos = new Point(
        this.terrainInitPos.x, 
        this.terrainInitPos.y,
        this.terrainInitPos.z + (((this.chunkSizeY - 1) * this.nTerrainObjectsCreated))
    )

    let terrain = new Terrain(
      newPos, //location
      this.parent, //parent
      `terrain: ${this.nTerrainObjectsCreated}`, //name
      this.chunkSizeX, //width
      this.chunkSizeY, //height
      5, //noise scale
      4, //octaves
      0.2, //persistance
      1.87, //lacunarity
      500, //seed
      new Vector2D(0, this.chunkSizeY * this.nTerrainObjectsCreated), //octave offset
      this.terrainHeightMultiplier, //height multiplier
      this.terrainColor, 
      // Color.random(),
      this.terrainObjects[0]
    )
    this.terrainObjects.unshift(terrain)
    this.nTerrainObjectsCreated++
    terrain.mesh.drawWireframe = true

    this.prevChunk = terrain  

    // if (this.terrainObjects.length > this.maxTerrainObjects){
    //   this.terrainObjects.pop()
    // }

    return terrain
  }
  
  execute(){
    if(this.cameraPos.z > this.terrainObjects[this.terrainObjects.length - 1].centrePos.z && this.canCreateNextTerrain){
      this.loadNextChunk()
      this.chunkLoadEvent.trigger()
      this.canCreateNextTerrain = false
    } 
    if(this.cameraPos.z > this.terrainObjects[this.terrainObjects.length - 1].centrePos.z + this.chunkSizeY * 0.5 && !this.canCreateNextTerrain){
      this.terrainObjects.pop()
      this.canCreateNextTerrain = true
    }

  }
}

export { TerrainGenerator }