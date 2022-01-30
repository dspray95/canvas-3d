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
import { Cuboid } from "../../engine/objects/primitives/Cuboid";
import { randomIntRange } from "../../tools/Random";
import { CameraController } from "./scripts/CameraController";

class CubeWorld extends Worldspace{

  constructor(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode){
    super(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode);
    this.name = "cubeworld"

    this.camera.translate(new Vector(0, 0, 0))
    this.objects['cubes'] = []
    for(let i = 0; i <= 20; i++){
        this.objects['cubes'].push(
            new Cuboid(
                new Vector(100, randomIntRange(-10, 10), i* 100),
                this,
                `cuboid ${i}`
            )
        )
    }

    this.scripts = [
        new CameraController(this.camera)
    ]
  }
  

}

export { CubeWorld };