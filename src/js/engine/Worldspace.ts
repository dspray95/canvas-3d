import { CONFIG, ENVIRONMENT } from "../../config/config";
import { BehaviourScript } from "../game/vaporwave-canyon/scripts/BehaviourScript";
import { Color } from "../tools/Colors";
import { Logger } from "./logging/logger";
import WorldObject from "./objects/WorldObject";
import { Camera } from "./rendering/Camera";
import Point from "./rendering/objects/primitives/Point";
import { Time } from "./Time";
import { Event } from "./Event";
import { DisplayMode } from "./rendering/DisplayMode";
import { DisplayDimensions } from "./rendering/DisplayDimensions";

class Worldspace {

  displayDimensions: DisplayDimensions;
  offscreenCanvasDimensions: DisplayDimensions;
  camera: Camera;
  backgroundColor: Color;
  backgroundColorHtmlRgba: string;
  objects: { "default": WorldObject[]; };
  origin: Point;
  lightSources: never[];
  scripts: BehaviourScript[];
  events: Event[]
  stats: any;
  logger: Logger;
  paused: boolean = false;
  offscreenCanvas: OffscreenCanvas;
  offscreenCanvasContext: OffscreenCanvasRenderingContext2D | null ;

  constructor(viewportWidth: number, viewportHeight: number) {

    this.displayDimensions = new DisplayDimensions(viewportWidth, viewportHeight);
    this.offscreenCanvasDimensions = this.getCameraCanvasDimensions(this.displayDimensions);

    this.offscreenCanvas = new OffscreenCanvas(this.displayDimensions.width, this.displayDimensions.height)
    this.offscreenCanvasContext = this.offscreenCanvas.getContext("2d", {willReadFrequently: true});

    this.camera = new Camera(
      this,
      this.offscreenCanvasDimensions.width,
      this.offscreenCanvasDimensions.height,
      CONFIG.CAMERA_CONFIG
    );
    this.backgroundColor = Color.SPACEBLUE;
    this.backgroundColorHtmlRgba = this.backgroundColor.toHtmlRgba();
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
    //Standard display mode 
    this.displayDimensions = new DisplayDimensions(viewportWidth, viewportHeight);
    this.offscreenCanvasDimensions = this.getCameraCanvasDimensions(this.displayDimensions);

    this.camera.resize(this.offscreenCanvasDimensions.width, this.offscreenCanvasDimensions.height, CONFIG.CAMERA_CONFIG)

  }
  
  getCameraCanvasDimensions(displayDimensions: DisplayDimensions): DisplayDimensions{
    const displayMode = displayDimensions.getDisplayMode();
    if(displayMode === DisplayMode.STANDARD){
      return displayDimensions
    }
    else if (displayMode === DisplayMode.VERTICAL){
      return new DisplayDimensions(displayDimensions.width * 3, displayDimensions.height);
    } else {
      return displayDimensions
    }
  }

  tick(ctx: any) {    
    if (this.paused) return;
    
    Time.tick()

    if (CONFIG.SHOW_FPS) this.stats.begin()

    this.scripts.forEach(script => {
      script.execute()
    })
    
    // this.offscreenCanvasContext.clearRect(0, 0, this.viewportHeight, this.viewportHeight);
    if (this.offscreenCanvasContext !== null){
    
      this.offscreenCanvasContext.fillStyle = this.backgroundColorHtmlRgba;
      this.offscreenCanvasContext.fillRect(0, 0, this.offscreenCanvasDimensions.width, this.offscreenCanvasDimensions.height );

      for(var objectGroup in this.objects){
        this.objects[objectGroup as keyof typeof this.objects].forEach(object => {
          object.tick();
          object.drawPerspective(this.offscreenCanvasContext, this.camera);
        })
      }

      // let imageData = this.offscreenCanvasContext.getImageData(0, 0, this.viewportWidth, this.viewportHeight)
      
      // ctx.putImageData(imageData, 0, 0);
      ctx.drawImage(this.offscreenCanvas, 0, 0)
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
