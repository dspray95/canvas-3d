import { Color } from "../tools/Colors";
import { Camera } from "./rendering/Camera";
import Point from "./rendering/objects/primitives/Point";

const Stats = require('stats.js')
const stats = new Stats()

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
    const Stats = require('stats.js')

    this.stats = new Stats()
    this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );
  }

  createMainCamera() {
    return new Camera();
  }

  handleKeyPress(event){
    // console.log(`${event.key} pressed`)
    // if(event.key in ['w', 'a', 's', 'd']){
      
    // }
  }
  
  tick(ctx) {
    this.scripts.forEach(script => {
      script.execute()
    })

    this.stats.begin()
    for(var objectGroup in this.objects){
      this.objects[objectGroup].forEach(object => {
        object.tick();
        object.drawPerspective(ctx, this.camera);
      })
    }
    this.stats.end()

    // this.lightSources.forEach((lightSource) => {
    //   lightSource.tick();
    // })

    this.camera.tick()
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
