import Point from "../../engine/rendering/rendering-objects/primitives/Point";
import { Worldspace } from "../../engine/worldspaces/Worldspace";
import { Color } from "../../tools/Colors";
import { Terrain } from "./game-objects/world/Terrain";
import LightSource from "../../engine/rendering/rendering-objects/light/LightSource"
import { Vector2D } from "../../engine/physics/vector/Vector2D";
import Vector from "../../engine/rendering/rendering-objects/primitives/Vector";
import { TerrainGenerator } from "./scripts/terrain/ProceduralTerrainGenerator";
import { ZigZag } from "./gui/ZigZag";
import { Morse } from "./gui/Morse";
import { NeuralNet } from "./gui/NeuralNet";
import { Fretboard } from "./gui/Fretboard";
import { Camera } from "../../engine/rendering/Camera";
import { CameraController } from "./scripts/CameraController";
import { GPUOnlyWorldspace } from "../../engine/worldspaces/GPUOnlyWorldspace";
import { CanvasOnlyWorldspace } from "../../engine/worldspaces/CanvasOnlyWorldspace";

class CanyonWorld extends CanvasOnlyWorldspace{

  constructor(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode){
    super(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode);
    this.name = "worldspace"

    let terrain = new Terrain(
      new Point(0, 0, 0), //location
      this, //parent
      "terrain", //name
      40, //width
      20, //height
      5, //noise scale
      4, //octaves
      0.2, //persistance
      1.87, //lacunarity
      500, //seed
      new Vector2D(0, 0), //octave offset
      1, //height multiplier
      Color.YELLOW, //terrain color,
      false,
      0
    )
    this.objects['terrain'] = [terrain]
          //this extracts out all our objects so we don't have to constantly re-build the matrix list that we'll be operating with
    this.worldSpaceMatrices = []
    for(var objectGroup in this.objects){
      this.objects[objectGroup].forEach(object => {
        this.worldSpaceMatrices = this.worldSpaceMatrices.concat(object.points)
      })
    }
    // this.scripts = [
    //   new TerrainGenerator(
    //     this,
    //     this.objects.terrain,
    //     this.camera.location,
    //     new Point(0, 0, 0),
    //     40,
    //     30,
    //     1,
    //     Color.YELLOW
    //   )
    // ]
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