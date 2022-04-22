import { Color } from "../tools/Colors";
import { Logger } from "./logging/logger";
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
    //stats + logging
    const Stats = require('stats.js')
    this.stats = new Stats()
    this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );
    
    this.logger = Logger.logger
  }

  createMainCamera() {
    return new Camera();
  }

  handleKeyUp(event){
    return
  }
  
  handleKeyDown(event){
    return
  }

  tick(ctx) {
    this.scripts.forEach(script => {
      script.execute()
    })

    this.stats.begin()

    for(var objectGroup in this.objects){
      this.objects[objectGroup].forEach(object => {
        object.tick();
        // vertexMatrices = vertexMatrices.concat(object.mesh.points.map(point => point.matrix))
        object.drawPerspective(ctx, this.camera);
      })
    }
    this.stats.end()
    
    this.camera.tick()
    this.ui.forEach((element) => {
      element.draw(ctx)
    })
    this.logger.tick()
  }
}

export { Worldspace };
