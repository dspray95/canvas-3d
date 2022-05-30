import { CONFIG } from "../../config/config";
import { Color } from "../tools/Colors";
import { Logger } from "./logging/logger";
import { Camera } from "./rendering/Camera";
import Point from "./rendering/objects/primitives/Point";
import { Time } from "./Time";


class Worldspace {
  constructor(viewportWidth, viewportHeight) {
    this.viewportWidth = viewportWidth
    this.viewportHeight = viewportHeight
    this.rootLocation = new Point(0, 0, 0);

    this.camera = new Camera(
      this,
      viewportWidth,
      viewportHeight,
      CONFIG.CAMERA_CONFIG
    );
    this.backgroundColor = Color.SPACEBLUE;
    this.objects = {
      "default": []
    }; 
    this.lightSources = []
    this.scripts = []
    this.ui = []
    this.objects = []
    //stats + logging
    const Stats = require('stats.js')
    this.stats = new Stats()
    this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );
    
    this.logger = Logger.logger
  }

  handleKeyUp(event){
    return
  }
  
  handleKeyDown(event){
    return
  }

  handleScreenResize(viewportWidth, viewportHeight){
    this.camera.resize(viewportWidth, viewportHeight, CONFIG.CAMERA_CONFIG)
  }

  tick(ctx) {
    this.stats.begin()

    this.scripts.forEach(script => {
      script.execute()
    })
    for(var objectGroup in this.objects){
      this.objects[objectGroup].forEach(object => {
        object.tick();
        object.drawPerspective(ctx, this.camera);
      })
    }
    
    this.camera.tick()
    this.ui.forEach((element) => {
      element.draw(ctx)
    })
    this.logger.tick()
    Time.tick()
    this.stats.end()
  }
}

export { Worldspace };
