import { Color } from "../tools/Colors";
import { Camera } from "./rendering/Camera";
import { kernelDynamicPerspectiveToScreenSpace } from "./rendering/gpu/ProjectionPipelineKernels";
import Point from "./rendering/objects/primitives/Point";
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
    this.scripts = [

    ]
    this.ui = []
  }

  createMainCamera() {
    return new Camera();
  }


  tick(ctx) {
    stats.begin()
    this.scripts.forEach(script => {
      script.execute()
    })
    
    let worldSpaceMatrices = []
    let screenspaceMatrices = []

    for(var objectGroup in this.objects){
      this.objects[objectGroup].forEach(object => {
        object.tick();
        worldSpaceMatrices = worldSpaceMatrices.concat(object.mesh.points.map(point => point.matrix))
        // object.drawPerspective(ctx, this.camera);
      })
    }
        
    // if(doOnce){
    //   doOnce = false
    //   console.log(worldSpaceMatrices.length)
    // }

    //TODO Should be able to combine these kernels and still get the perspective space output...
    //Will be way faster than passing data cpu>gpu>cpugpu>cpu
    let perspectiveSpaceMatrices = this.camera.doMatrixPerspectivePointProjection(worldSpaceMatrices)
    let screenSpaceMatrices = kernelDynamicPerspectiveToScreenSpace(perspectiveSpaceMatrices, this.viewportWidth, this.viewportHeight)

    let nPointsTraversed = 0
    for(var objectGroup in this.objects){
      this.objects[objectGroup].forEach(object => {
        object.mesh.points.forEach(point => {
          point.inPerspectiveSpace.setMatrixFromList(perspectiveSpaceMatrices[nPointsTraversed])
          point.screenSpaceX = screenSpaceMatrices[nPointsTraversed][0]
          point.screenSpaceY = screenSpaceMatrices[nPointsTraversed][1]
          nPointsTraversed++
        })
        object.mesh.drawPerspective(ctx, this.camera)
      })
    }

    this.camera.tick()

    this.lightSources.forEach((lightSource) => {
      lightSource.tick();
    })

    this.ui.forEach((element) => {
      element.draw(ctx)
    })
    stats.end()
    // ctx.beginPath()
    // ctx.moveTo(this.viewportWidth, this.viewportHeight * 0.26)
    // ctx.lineTo(this.viewportWidth * 0.995, this.viewportHeight * 0.24)
    // ctx.lineTo(this.viewportWidth * 0.99, this.viewportHeight * 0.26)
    // ctx.lineTo(this.viewportWidth * 0.985, this.viewportHeight * 0.24)
    // ctx.lineTo(this.viewportWidth * 0.98, this.viewportHeight * 0.26)

    // ctx.strokeStyle = Color.WHITE.toHtmlRgba()
    // ctx.lineWidth = 3
    // ctx.stroke()

  }
}

export { Worldspace };
