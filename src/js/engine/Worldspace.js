import { Color } from "../tools/Colors";
import { Camera } from "./rendering/Camera";
import { kernelDynamicPerspectiveToScreenSpace } from "./rendering/gpu/ProjectionPipelineKernels";
import Point from "./rendering/objects/primitives/Point";
import { CameraController } from "../game/vaporwave-canyon/scripts/CameraController";
import { TerrainGenerator } from "../game/vaporwave-canyon/scripts/terrain/ProceduralTerrainGenerator";
import { render } from "./rendering/gpu/DrawKernels";

const Stats = require('stats.js')

let stats = new Stats()
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

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

    //Hacky stuff so we don't need to update the matrix list every frame
    this.worldSpaceMatrices = []
    for(var objectGroup in this.objects){
      this.objects[objectGroup].forEach(object => {
        this.worldSpaceMatrices = this.worldSpaceMatrices.concat(object.mesh.points.map(point => point.matrix))
      })
    }
  }

  createMainCamera() {
    return new Camera();
  }


  tick(ctx) {
    stats.begin()
    this.scripts.forEach(script => {
      script.execute()
    })
      
    //TODO Should be able to combine these kernels and still get the perspective space output...
    //Will be way faster than passing data cpu>gpu>cpugpu>cpu
    let perspectiveSpaceMatrices = this.camera.doMatrixPerspectivePointProjection(this.worldSpaceMatrices)
    let screenSpaceMatrices = kernelDynamicPerspectiveToScreenSpace(perspectiveSpaceMatrices, this.viewportWidth, this.viewportHeight)

    render()
    if (doOnce) {
      console.log(render.getPixels())
      console.log(render.canvas)
      console.log(render)
      doOnce = false
    }
    let data = new ImageData(render.getPixels(), 1920, 1080)
    ctx.putImageData(data, 0, 0)

    // let nPointsTraversed = 0
    // for(var objectGroup in this.objects){
    //   this.objects[objectGroup].forEach(object => {
    //     object.mesh.points.forEach(point => {
    //       point.inPerspectiveSpace.setMatrixFromList(perspectiveSpaceMatrices[nPointsTraversed])
    //       point.screenSpaceX = screenSpaceMatrices[nPointsTraversed][0]
    //       point.screenSpaceY = screenSpaceMatrices[nPointsTraversed][1]
    //       nPointsTraversed++
    //     })
    //     object.mesh.drawPerspective(ctx, this.camera)
    //   })
    // }

    this.camera.tick()

    this.lightSources.forEach((lightSource) => {
      lightSource.tick();
    })

    this.ui.forEach((element) => {
      element.draw(ctx)
    })
    stats.end()
  }
}

export { Worldspace };
