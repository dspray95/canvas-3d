import Point from "../../engine/rendering/objects/primitives/Point";
import { Worldspace } from "../../engine/Worldspace";
import { Color } from "../../tools/Colors";
import { TerrainGenerator } from "./scripts/terrain/ProceduralTerrainGenerator";
import { ZigZag } from "./gui/ZigZag";
import { Morse } from "./gui/Morse";
import { NeuralNet } from "./gui/NeuralNet";
import { Fretboard } from "./gui/Fretboard";
import { CameraController } from "./scripts/CameraController";
import { Player } from "./game-objects/actors/Player";
import { PlayerControler } from "./scripts/movement/PlayerController";
import { MobSpawner } from "./scripts/MobSpawner";
import { Blocker } from "./game-objects/world/Blocker";


  class CanyonWorld extends Worldspace{

    constructor(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode){
      super(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode);
      this.name = "worldspace"
      let terrainSizeX = 22
      let terrainSizeY = 30
      let terrainColor = new Color(60, 66, 98)
      let terrainHeight = 0
      let heightMultiplier = 3
      let terrainInitPos = new Point(0, terrainHeight, 0)

      this.player = new Player(new Point(0, 1, 3), this)
      this.playerControler = new PlayerControler(this.player, this.camera, 0.3, 0.2, true)
      this.cameraController = new CameraController(this.camera, 0.4, 0)
      this.objects["terrain"] = []
      this.objects["mobs"] = [
        // new Blocker(new Point(0, 1, 10), this),
        new Blocker(new Point(-1, 1, 20), this),
        new Blocker(new Point(1, 1, 20), this)
      ]
      
      this.objects["player"] = [this.player]
      this.scripts = [
        new TerrainGenerator(
          this,
          this.objects['terrain'],
          this.camera.location,
          terrainInitPos,
          terrainSizeX,
          terrainSizeY,
          heightMultiplier,
          terrainColor
        ),
        this.playerControler,
        // this.cameraController,
        new MobSpawner()
      ]
      
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

    handleKeyDown(event){
      this.playerControler.parseInput(event.keyCode || event.which, "keyDown")
      this.cameraController.move(event.key, "startMovement")
    }
    
    handleKeyUp(event){
      this.playerControler.parseInput(event.keyCode || event.which, "keyUp")
      this.cameraController.move(event.key, "stopMovement")

    }
    

  }

  export { CanyonWorld };