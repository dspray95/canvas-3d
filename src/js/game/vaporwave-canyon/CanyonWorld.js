import Point from "../../engine/rendering/objects/primitives/Point";
import { Worldspace } from "../../engine/Worldspace";
import { Color } from "../../tools/Colors";
import { TerrainGenerator } from "./scripts/terrain/ProceduralTerrainGenerator";
import { Player } from "./game-objects/actors/Player";
import { PlayerController } from "./scripts/movement/PlayerController";
import { CONFIG } from "../../../config/config";
import { ChunkLoad } from "./events/ChunkLoadEvent";
import { MobSpawner } from "./scripts/MobSpawner";


  class CanyonWorld extends Worldspace{

    constructor(viewportWidth, viewportHeight){
      super(viewportWidth, viewportHeight);
      this.name = "worldspace"

      const playerConfig = CONFIG.PLAYER_CONFIG
      const movementConfig = CONFIG.MOVEMENT_CONFIG

      this.initWorldObjectContainers()
      this.initPlayer(playerConfig, movementConfig)
      
      const mobSpawner = new MobSpawner(this.backgroundColor, null)

      const chunkLoadEvent = new ChunkLoad(
        this.camera.location,
        CONFIG.TERRAIN_CONFIG.sizeY,
        [mobSpawner.generateChunk.bind(mobSpawner)]
      )

      this.scripts.push(
        new TerrainGenerator(
          this,
          this.objects['terrain'],
          this.camera.location,
          new Point(...CONFIG.TERRAIN_CONFIG.initPosXYZ),
          CONFIG.TERRAIN_CONFIG.sizeX,
          CONFIG.TERRAIN_CONFIG.sizeY,
          CONFIG.TERRAIN_CONFIG.heightMultiplier,
          new Color(...CONFIG.TERRAIN_CONFIG.colorRGB),
          chunkLoadEvent
        )
      )

      this.events.push(
        chunkLoadEvent
      )
    }

    handleKeyDown(event){
      this.playerController.parseInput(event.keyCode || event.which, "keyDown")
    }
    
    handleKeyUp(event){
      this.playerController.parseInput(event.keyCode || event.which, "keyUp")
    }
    
    initWorldObjectContainers(){
      this.objects["terrain"] = []
      this.objects["mobs"] = []
      this.objects["player"] = []

    }

    initScripts(){
     
    }

    initPlayer(){
      if(CONFIG.PLAYER_CONFIG.showPlayer){
        this.player = new Player(new Point(...CONFIG.PLAYER_CONFIG.playerStartPosXYZ), this)
        this.objects.player.push(this.player)
        if(CONFIG.PLAYER_CONFIG.enablePlayerController ){
          this.playerController = new PlayerController(
            this.player, 
            this.camera, 
            CONFIG.PLAYER_CONFIG.playerXMovementSpeed, 
            CONFIG.PLAYER_CONFIG.playerZMovementSpeed, 
            true
          )
          this.scripts.push(this.playerController)
        }
      }
    }

  }

  export { CanyonWorld };