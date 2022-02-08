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
import { Cuboid } from "../../engine/objects/primitives/Cuboid";
import { randomIntRange } from "../../tools/Random";
import { CameraController } from "./scripts/CameraController";
import { CanvasOnlyWorldspace } from "../../engine/worldspaces/CanvasOnlyWorldspace";
import { makeCuboid } from "../../engine/matrix-rendering/meshes/Mesh"

class CubeWorld extends CanvasOnlyWorldspace{

  constructor(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode){
    super(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode);
    this.name = "cubeworld"

  }
  

}

export { CubeWorld };