import React, { Component, createRef } from "react";
import { CanyonWorld } from "../js/game/vaporwave-canyon/CanyonWorld";
import { DisplayMode } from "../js/engine/rendering/DisplayMode";
import { Color } from "../js/tools/Colors";

class EngineRenderer extends Component{

    constructor(props) {
        super(props);
        
        const canyonWorldspace = new CanyonWorld(window.innerWidth, window.innerHeight, this.getDisplayMode())
        this.state = {
          width: window.innerWidth,
          height: window.innerHeight,
          canvasRef: createRef(),
          animRequestIdRef: createRef(),
          worldspace: canyonWorldspace,
          fillStyle: canyonWorldspace.backgroundColor.toHtmlRgba(),
          keyDownListener: null,
          keyUpListener: null
        }
        const visibilityChangeListener = this.state.worldspace.handleVisibilityChange.bind(this.state.worldspace)
        document.addEventListener("visibilitychange", visibilityChangeListener)

        this.canvasContext = null
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize.bind(this))
        this.setupInputListeners()
        document.addEventListener("keydown", this.state.worldspace.handleKeyDown.bind(this.state.worldspace))
        document.addEventListener("keyup", this.state.worldspace.handleKeyUp.bind(this.state.worldspace) )
        this.state.animRequestIdRef.current = requestAnimationFrame(this.tick.bind(this))
        return () => {
            cancelAnimationFrame(this.state.animRequestIdRef.current)
        }
    }

    setupInputListeners(){
        const keyDownListener = this.state.worldspace.handleKeyDown.bind(this.state.worldspace)
        const keyUpListener = this.state.worldspace.handleKeyUp.bind(this.state.worldspace)

        document.addEventListener("keydown", keyDownListener)
        document.addEventListener("keyup", keyUpListener)

        this.setState({
            keyDownListener: keyDownListener,
            keyUpListener: keyUpListener
        }) 
    }

    componentWillUnmount(){
        cancelAnimationFrame(this.state.animRequestIdRef.current)
        document.removeEventListener("keydown", this.state.keyDownListener)
        document.removeEventListener("keyup", this.state.keyUpListener)
        this.state.canvasRef.current = null
    }

    onResize(){
        this.setState({width: window.innerWidth, height: window.innerHeight})
        this.state.worldspace.handleScreenResize(window.innerWidth, window.innerHeight, this.getDisplayMode())
    }

    canvasDraw(ctx) {
        this.state.worldspace.tick(ctx);
    }

    tick(){
        if(!this.state.canvasRef.current) return
        this.canvasDraw(this.canvasContext)
        this.state.animRequestIdRef.current = requestAnimationFrame(this.tick.bind(this))
    }

    storeCanvas(canvasNode) {
        this.canvasContext = canvasNode.getContext("2d")
        this.canvasContext.fillColor = Color.SPACEBLUE.toHtmlRgba();
        this.canvasContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
        this.state.canvasRef.current = canvasNode
    }

    getDisplayMode(){
        let displayMode = DisplayMode.STANDARD;
        if (window.innerHeight > window.innerWidth){
            displayMode = DisplayMode.VERTICAL;
        }
        return displayMode;
    }

    render() {
        return (
            <div
                id="gameEngineWrapper"            
                width={this.state.width}
                height={this.state.height}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0
                }}
            >
                <canvas
                    className="gameEngineRenderer"
                    width={this.state.width}
                    height={this.state.height}
                    ref={node => node ? this.storeCanvas(node): null}
                />
            </div>

        );
      }

}

export { EngineRenderer }