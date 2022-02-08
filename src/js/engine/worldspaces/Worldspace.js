import { Color } from "../../tools/Colors";
import { Camera } from "../rendering/Camera";
import { kernelDynamicPerspectiveToScreenSpace } from "../rendering/gpu/ProjectionPipelineKernels";
import Point from "../rendering/rendering-objects/primitives/Point";
import { CameraController } from "../../game/vaporwave-canyon/scripts/CameraController";
import { TerrainGenerator } from "../../game/vaporwave-canyon/scripts/terrain/ProceduralTerrainGenerator";
import { render } from "../rendering/gpu/DrawKernels";

let doOnce = true


class Worldspace {
  constructor(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode) {
    this.xLim = xLim;
    this.yLim = yLim;
    this.zLim = zLim;
    this.viewportWidth = viewportWidth
    this.viewportHeight = viewportHeight
    this.rootLocation = new Point(0, 0, 0);
    this.centre = new Point(xLim * 0.5, yLim * 0.5, zLim * 0, 5);
    this.camera = this.createMainCamera(
      this.centre,
      viewportWidth,
      viewportHeight
    );
    this.backgroundColor = Color.SPACEBLUE;
    this.projectionMode = projectionMode;
    this.objects = {
      "default": []
    }; 
    this.lightSources = []
    let terrainSizeX = 46
    let terrainSizeY = 24
    let terrainColor = new Color(60, 66, 98)
    let terrainHeight = -1.5
    let heightMultiplier = 2.2
    let terrainInitPos = new Point(0, terrainHeight, terrainSizeY * 0.5)
    
    this.objects["terrain"] = []
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
      new CameraController(
        this.camera
      )
    ]

    this.ui = []
    this.scripts.forEach(script => {
      script.execute()
    })

    const Stats = require('stats.js')

    this.stats = new Stats()
    this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );

    //Hacky stuff so we don't need to update the matrix list every frame
    // this.worldSpaceMatrices = []
    // for(var objectGroup in this.objects){
    //   this.objects[objectGroup].forEach(object => {
    //     this.worldSpaceMatrices = this.worldSpaceMatrices.concat(object.mesh.points.map(point => point.matrix))
    //   })
    // }
  }

  createMainCamera() {
    return new Camera();
  }
}

export { Worldspace };
