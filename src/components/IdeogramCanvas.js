import React, { useRef, useEffect, Component } from 'react'
import { FretboardConfig, MorseConfig, MountainsConfig, NeuralNetConfig } from '../config/IdeogramConfig'
import { Fretboard } from '../js/game/vaporwave-canyon/gui/Fretboard'
import { Morse } from '../js/game/vaporwave-canyon/gui/Morse'
import { Mountains } from '../js/game/vaporwave-canyon/gui/Mountains'
import { NeuralNet } from '../js/game/vaporwave-canyon/gui/NeuralNet'

class IdeogramCanvas extends Component{

    constructor(props){
        super(props)
        this.state = {
            canvasRef: React.createRef(),
            // orientation: this.orientation()
        }
    }

    // orientation(){
    //     const orientation = (Screen.orientation || {}).type || Screen.mozOrientation || Screen.msOrientation

    //     if(orientation === "portrait-primary" || orientation === "portrait-secondary"){
    //             return "PORTRAIT"
    //     } else {
    //         return "LANDSCAPE"
    //     }
    // }

    getConfig(type){
        let orientation = null
        if(window.innerHeight > window.innerWidth){
            orientation = "PORTRAIT"
        } else {
            orientation = "LANDSCAPE"
        }
        return {
            "morse-ogham": MorseConfig,
            "neural-net": NeuralNetConfig,
            "fretboard": FretboardConfig,
            "mountains": MountainsConfig 
        }[type][orientation]
    }

    getIdeogram(type, width, height){
        const config = this.props.config

        const ideograms = {
            'morse-ogham': () => {
                return new Morse({
                    "ditDahList":config.MESSAGE,
                    "spacing": height * config.SPACING, 
                    "leadLength": height * config.LEAD_LENGTH, 
                    "trailLength": height * config.TRAIL_LENGTH, 
                    "xPos": width * config.X_POS, 
                    "yPos": height * config.Y_POS
                })
            },
            'neural-net': () => {
                return new NeuralNet({
                    "nCols": config.N_COLS,
                    "nRows": config.N_ROWS,
                    "spacing": width * config.SPACING,
                    "xPos": width * config.X_POS,
                    "yPos": width * config.Y_POS,
                    "neuronRadius": config.NEURON_RADIUS
                })
            },
            'fretboard': () => { 
                return new Fretboard({
                        height: height * config.HEIGHT, 
                        xPos: 0 * config.X_POS,
                        yPos: 0 * config.Y_POS,
                        fretSpacing: width * config.FRET_SPACING
                    })
            },
            'mountains': () => {
                return new Mountains({
                    nPeaks: config.N_PEAKS,
                    slopeDistance: width * config.SLOPE_DISTANCE,
                    peakHeight: height * config.PEAK_HEIGHT,
                    xPos: width * config.X_POS,
                    yPos: 0 * config.Y_POS,
                    alignment: config.ALIGNMENT
                })
            }
        }
        return ideograms[type]()
    }
    
    componentDidMount(){
        // window.addEventListener("resize", this.onResize.bind(this))
        const canvas = this.state.canvasRef.current
        this.drawIdeogram(canvas)
    }

    drawIdeogram(canvas){
        const ctx = canvas.getContext('2d')        
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

        const ideogram = this.getIdeogram(
            this.props.ideogramType, 
            this.props.width,
            this.props.height,
            this.props.config
        )
        ideogram.draw(ctx)
    }

    componentDidUpdate(){
        const canvas = this.state.canvasRef.current
        this.drawIdeogram(canvas)
    }
    
    render() {
        return <canvas
            id={this.props.ideogramType}
            ref={this.state.canvasRef} 
            width={this.props.width}
            height={this.props.height}
            style={this.props.style}
        /> 
    }
}

export { IdeogramCanvas }