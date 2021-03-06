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
class CanyonWorld extends Worldspace{

  constructor(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode){
    super(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode);
    this.name = "worldspace"
    let terrainSizeX = 46
    let terrainSizeY = 24
    let terrainColor = new Color(60, 66, 98)
    let terrainHeight = -1.5
    let heightMultiplier = 2.2
    let terrainInitPos = new Point(0, terrainHeight, terrainSizeY * 0.5)
    this.objects["terrain"] = [
      // new Terrain(
      //   terrainInitPos, //location
      //   this, //parent
      //   "terrain", //name
      //   24, //width
      //   90, //height
      //   5, //noise scale
      //   4, //octaves
      //   0.2, //persistance
      //   1.87, //lacunarity
      //   500, //seed
      //   new Vector2D(0, 0), //offset
      //   heightMultiplier, //height multiplier
      //   terrainColor //terrain color
      // )
    ]
    
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
      )
    ]

    // this.camera.location = new Point(0, 10, 0);
    // this.lightSources.push(new LightSource(new Point(0, -10, 0), Color.WHITE, 200 ))
    this.camera.translate(new Vector(0, 0, -2))

    
    
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