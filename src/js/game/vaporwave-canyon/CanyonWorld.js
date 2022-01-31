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
import { Camera } from "../../engine/rendering/Camera";
import { CameraController } from "./scripts/CameraController";
class CanyonWorld extends Worldspace{

  constructor(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode){
    super(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode);
    this.name = "worldspace"

    // this.camera.location = new Point(0, 10, 0);
    // this.lightSources.push(new LightSource(new Point(0, -10, 0), Color.WHITE, 200 ))
    this.camera.translate(new Vector(0, 0, 1)) 
    
    // if(this.viewportHeight > this.viewportWidth){
    //   this.ui.push(new ZigZag(10, this.viewportWidth*0.02, this.viewportHeight*0.02, this.viewportWidth, 300, "right"))
    //   this.ui.push(new ZigZag(10, this.viewportWidth*0.02, this.viewportHeight*0.02, this.viewportWidth - this.viewportWidth*0.01, 350, "right"))
    //   this.ui.push(new Morse(".... .. .-. . / -- .", 10, this.viewportHeight * 0.2, 100, this.viewportWidth * 0.05, this.viewportHeight))
    //   this.ui.push(new NeuralNet(6, 4, 30, this.viewportHeight * 0.02, this.viewportHeight * 0.02))
    //   this.ui.push(new Fretboard(30, 27.5, this.viewportWidth - this.viewportWidth * 0.35, 0))
    // }
    // else{
    //   this.ui.push(new ZigZag(10, this.viewportWidth*0.01, this.viewportHeight*0.02, this.viewportWidth, 300, "right"))
    //   this.ui.push(new ZigZag(10, this.viewportWidth*0.01, this.viewportHeight*0.02, this.viewportWidth - this.viewportWidth*0.01, 350, "right"))
    //   this.ui.push(new Morse(".... .. .-. . / -- .", 10, 250, 100, 100, this.viewportHeight))
    //   this.ui.push(new NeuralNet(6, 4, 30, 100, 100))
    //   this.ui.push(new Fretboard(30, 27.5, this.viewportWidth - this.viewportWidth * 0.075, 0))
    // }



  }
  

}

export { CanyonWorld };