  import Point from "../../engine/rendering/objects/primitives/Point";
  import { Worldspace } from "../../engine/Worldspace";
  import { Color } from "../../tools/Colors";
  import { Terrain } from "./game-objects/world/Terrain";
  import LightSource from "../../engine/rendering/objects/light/LightSource"
  import { Vector2D } from "../../engine/physics/vector/Vector2D";
  import Vector from "../../engine/rendering/objects/primitives/Vector";
  import { TerrainGenerator } from "./scripts/terrain/ProceduralTerrainGenerator";
  import { ZigZag } from "./gui/ZigZag";
  import { Morse } from "./gui/Morse";
  import { NeuralNet } from "./gui/NeuralNet";
  import { Fretboard } from "./gui/Fretboard";
  import { CameraController } from "./scripts/CameraController";
  import { Player } from "./game-objects/actors/Player";


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
      this.objects["terrain"] = []
      this.objects["player"] = [new Player(new Point(0, 1, 3), this)]
      this.cameraController = new CameraController(this.camera, 0.1, 0)
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
        this.cameraController
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
      if(['w', 'a', 's', 'd', 'q', 'e'].includes(event.key.toLowerCase())){
        this.cameraController.move(event.key, "startMovement")
      }
    }
    
    handleKeyUp(event){
      if(['w', 'a', 's', 'd', 'q', 'e'].includes(event.key.toLowerCase())){
        this.cameraController.move(event.key, "stopMovement")
      }
    }
    

  }

  export { CanyonWorld };