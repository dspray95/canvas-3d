import { Color } from "../tools/Colors";
import { Camera } from "./rendering/Camera";
import Point from "./rendering/objects/primitives/Point";

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
    this.scripts = []
    this.ui = []
  }

  createMainCamera() {
    return new Camera();
  }


  tick(ctx) {
    this.scripts.forEach(script => {
      script.execute()
    })
    
    let vertexMatrices = []

    for(var objectGroup in this.objects){
      this.objects[objectGroup].forEach(object => {
        object.tick();
        // vertexMatrices = vertexMatrices.concat(object.mesh.points.map(point => point.matrix))
        object.drawPerspective(ctx, this.camera);
      })
    }

    // let transformedMatrices = this.camera.doMatrixPerspectivePointProjection(vertexMatrices)

    // let nPointsTraversed = 0
    // for(var objectGroup in this.objects){
    //   this.objects[objectGroup].forEach(object => {
    //     object.mesh.points.forEach(point => {
    //       point.inPerspectiveSpace.setMatrixFromList(transformedMatrices[nPointsTraversed])
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
