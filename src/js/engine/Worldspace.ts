import { CONFIG, ENVIRONMENT } from "../../config/config";
import { BehaviourScript } from "../game/vaporwave-canyon/scripts/BehaviourScript";
import { Color } from "../tools/Colors";
import { Logger } from "./logging/logger";
import WorldObject from "./objects/WorldObject";
import { Camera } from "./rendering/Camera";
import Point from "./rendering/objects/primitives/Point";
import { Time } from "./Time";
import { Event } from "./Event";
 
class Worldspace {

  viewportWidth: number;
  viewportHeight: number;
  camera: Camera;
  backgroundColor: Color;
  objects: { "default": WorldObject[]; };
  origin: Point;
  lightSources: never[];
  scripts: BehaviourScript[];
  events: Event[]
  stats: any;
  logger: Logger;
  paused: boolean = false;

  constructor(viewportWidth: number, viewportHeight: number) {
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

  handleKeyUp(event: any){
    return
  }
  
  handleKeyDown(event: any){
    return
  }

  handleVisibilityChange(){
    if (document.visibilityState === "visible") {
      // If we switch to visible from hidden, the time at last frame will still be the time when
      // the tab was hidden, and so will likely be a large number, throwing off the deltaTime since
      // the rest of the game will have paused
      Time.updateTimeAtLastFrame();
      this.paused = false;
    }
    if (document.visibilityState === "hidden"){
      this.paused = true;
    }
  }
  
  handleScreenResize(viewportWidth: number, viewportHeight: number){
    this.camera.resize(viewportWidth, viewportHeight, CONFIG.CAMERA_CONFIG)
  }

  tick(ctx: any) {    
    if (this.paused) return;
    
    Time.tick()

    if (CONFIG.SHOW_FPS) this.stats.begin()

    this.scripts.forEach(script => {
      script.execute()
    })
    
    for(var objectGroup in this.objects){
      this.objects[objectGroup as keyof typeof this.objects].forEach(object => {
        object.tick();
        object.drawPerspective(ctx, this.camera);
      })
    }
    
    this.events.forEach(event => {
      event.checkTrigger()
    })
    
    this.camera.tick()
    this.logger.tick()
    
    if (CONFIG.SHOW_FPS) this.stats.end()
  }
}

export { Worldspace };
