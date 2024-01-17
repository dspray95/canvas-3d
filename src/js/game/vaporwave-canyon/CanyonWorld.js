import Point from "../../engine/rendering/objects/primitives/Point";
import { Worldspace } from "../../engine/Worldspace";
import { TerrainGenerator } from "./scripts/terrain/ProceduralTerrainGenerator";
import { Player } from "./game-objects/actors/Player";
import { PlayerController } from "./scripts/movement/PlayerController";
import { CONFIG } from "../../../config/config";
import { MobSpawner } from "./scripts/MobSpawner";
import { Event } from "../../engine/Event";
import { LaserBeam } from "./game-objects/actors/LaserBeam";
import { CollisionBox } from "../../engine/objects/primitives/CollisionBox";
import WorldObject from "../../engine/objects/WorldObject";
import Vector from "../../engine/rendering/objects/primitives/Vector";
import { Blocker } from "./game-objects/world/Blocker";
import { EnemyStarfighter } from "./game-objects/actors/EnemyStartfighter";
import { Starfighter } from "./game-objects/actors/Starfighter";
import { Logger } from "../../engine/logging/logger";


  class CanyonWorld extends Worldspace{

    testEnemy;

    constructor(viewportWidth, viewportHeight){
      super(viewportWidth, viewportHeight);
      this.name = "worldspace"

      const playerConfig = CONFIG.PLAYER_CONFIG
      const movementConfig = CONFIG.MOVEMENT_CONFIG

      this.initWorldObjectContainers()
      this.initPlayer(playerConfig, movementConfig)
      
      const mobSpawner = new MobSpawner(this.backgroundColor, null)

      const chunkLoadEvent = new Event(
        () => mobSpawner.generateChunk()
      )

      this.scripts.push(
        new TerrainGenerator(
          this,
          this.objects['terrain'],
          this.camera.location,
          CONFIG.TERRAIN_CONFIG,
          chunkLoadEvent
        )
      )

      // const boxLocation = new Point(...CONFIG.PLAYER_CONFIG.playerStartPosXYZ)
      // boxLocation.add(new Vector(0, 0, 10))
      // let testBox = new Blocker(boxLocation, this)
      // this.objects.mobs.push(testBox)

      this.testEnemy = new EnemyStarfighter(
        new Point(0, 0.5, 10),
        this
      );
      this.objects.mobs.push(this.testEnemy);

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
      this.objects["other"] = []
      this.objects["player"] = []

    }

    initScripts(){
     
    }

    initPlayer(){
      if(CONFIG.PLAYER_CONFIG.showPlayer){
        Logger.logger.log(`${CONFIG.PLAYER_CONFIG.playerXMovementSpeed}`);
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