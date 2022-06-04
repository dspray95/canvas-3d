import React, { Component, createRef } from "react";
import { CanyonWorld } from "../js/game/vaporwave-canyon/CanyonWorld";

class EngineRenderer extends Component{

    constructor(props) {
        super(props);
        
        const canyonWorldspace = new CanyonWorld(window.innerWidth, window.innerHeight)
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
        this.state.worldspace.handleScreenResize(window.innerWidth, window.innerHeight)
    }

    canvasDraw(ctx) {
        ctx.clearRect(0, 0, this.state.width, this.state.height);
        ctx.fillStyle = this.state.fillStyle
        ctx.fillRect(0, 0, this.state.width, this.state.height);
        this.state.worldspace.tick(ctx);
    }

    tick(){
        if(!this.state.canvasRef.current) return
        this.canvasDraw(this.canvasContext)
        this.state.animRequestIdRef.current = requestAnimationFrame(this.tick.bind(this))
    }

    storeCanvas(canvasNode) {
        this.canvasContext = canvasNode.getContext("2d")
        this.state.canvasRef.current = canvasNode
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