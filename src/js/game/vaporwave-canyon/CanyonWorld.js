import Point from "../../engine/rendering/objects/primitives/Point";
import { Worldspace } from "../../engine/Worldspace";
import { Color } from "../../tools/Colors";
import { TerrainGenerator } from "./scripts/terrain/ProceduralTerrainGenerator";
import { ZigZag } from "./gui/ZigZag";
import { Morse } from "./gui/Morse";
import { NeuralNet } from "./gui/NeuralNet";
import { Fretboard } from "./gui/Fretboard";
import { Player } from "./game-objects/actors/Player";
import { PlayerController } from "./scripts/movement/PlayerController";
import { CONFIG } from "../../../config/config";


  class CanyonWorld extends Worldspace{

    constructor(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode){
      super(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode);

      this.name = "worldspace"

      const playerConfig = CONFIG.PLAYER_CONFIG
      const movementConfig = CONFIG.MOVEMENT_CONFIG

      this.initWorldObjectContainers()
      this.initPlayer(playerConfig, movementConfig)
      this.initUI()

      this.scripts.push(
        new TerrainGenerator(
          this,
          this.objects['terrain'],
          this.camera.location,
          new Point(...CONFIG.TERRAIN_CONFIG.initPosXYZ),
          CONFIG.TERRAIN_CONFIG.sizeX,
          CONFIG.TERRAIN_CONFIG.sizeY,
          CONFIG.TERRAIN_CONFIG.heightMultiplier,
          new Color(...CONFIG.TERRAIN_CONFIG.colorRGB)
        )
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

    initUI(){
      if(this.viewportHeight > this.viewportWidth){
        this.ui.push(new ZigZag(10, this.viewportWidth*0.02, this.viewportHeight*0.02, this.viewportWidth, 300, "right"))
        this.ui.push(new ZigZag(10, this.viewportWidth*0.02, this.viewportHeight*0.02, this.viewportWidth - this.viewportWidth*0.01, 350, "right"))
        this.ui.push(new Morse(".... .. .-. . / -- .", 10, this.viewportHeight * 0.2, 100, this.viewportWidth * 0.05, this.viewportHeight))
        this.ui.push(new NeuralNet(6, 4, 30, this.viewportHeight * 0.02, this.viewportHeight * 0.02))
        this.ui.push(new Fretboard(30, 27.5, this.viewportWidth - this.viewportWidth * 0.35, 0))
      }
      else{
        this.ui.push(new ZigZag(10, this.viewportWidth*0.01, this.viewportHeight*0.02, this.viewportWidth, 300, "right"))
        this.ui.push(new ZigZag(10, this.viewportWidth*0.01, this.viewportHeight*0.02, this.viewportWidth - this.viewportWidth*0.01, 350, "right"))
        this.ui.push(new Morse(".... .. .-. . / -- .", 10, 250, 100, 100, this.viewportHeight))
        this.ui.push(new NeuralNet(6, 4, 30, 100, 100))
        this.ui.push(new Fretboard(30, 27.5, this.viewportWidth - this.viewportWidth * 0.075, 0))
      }
    }

  }

  export { CanyonWorld };