import { CONFIG, ENVIRONMENT } from "../../config/config";
import { Color } from "../tools/Colors";
import { Logger } from "./logging/logger";
import { Camera } from "./rendering/Camera";
import Point from "./rendering/objects/primitives/Point";
import { Time } from "./Time";


class Worldspace {
  constructor(viewportWidth, viewportHeight) {
    this.viewportWidth = viewportWidth
    this.viewportHeight = viewportHeight

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
    this.origin = new Point(0, 0, 0);

    this.lightSources = []
    this.scripts = []
    this.ui = []
    this.events = []

    //stats + logging
    if(CONFIG.SHOW_FPS){
      const Stats = require('stats.js')
      this.stats = new Stats()
      this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild( this.stats.dom );
    }
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
    Time.tick()

    if (CONFIG.SHOW_FPS) this.stats.begin()

    this.scripts.forEach(script => {
      script.execute()
    })
    
    for(var objectGroup in this.objects){
      this.objects[objectGroup].forEach(object => {
        object.tick();
        object.drawPerspective(ctx, this.camera);
      })
    }
    
    this.ui.forEach((element) => {
      element.draw(ctx)
    })

    this.events.forEach(event => {
      event.checkTrigger()
    })
    
    this.camera.tick()
    this.logger.tick()
    
    if (CONFIG.SHOW_FPS) this.stats.end()
  }
}

export { Worldspace };
