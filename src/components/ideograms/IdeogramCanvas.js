import React, { useRef, useEffect, Component } from 'react'
import { Fretboard } from '../../js/game/vaporwave-canyon/gui/Fretboard'
import { Morse } from '../../js/game/vaporwave-canyon/gui/Morse'
import { Mountains } from '../../js/game/vaporwave-canyon/gui/Mountains'
import { NeuralNet } from '../../js/game/vaporwave-canyon/gui/NeuralNet'

class IdeogramCanvas extends Component{

    constructor(props){
        super(props)
        this.state = {
            canvasRef: React.createRef()
        }
    }
    // 6, 4, 30, this.viewportHeight * 0.02, this.viewportHeight * 0.02)
    getIdeogram(type, width, height){
        const ideograms = {
            'morse-ogham': () => {
                return new Morse({
                    "ditDahList": ".... .. .-. . / -- .",
                    "spacing": height * 0.015, 
                    "leadLength": height * 0.2, 
                    "trailLength": height * 0.2, 
                    "xPos": width * 0.5, 
                    "yPos": height
                })
            },
            'neural-net': () => {
                return new NeuralNet({
                    "nCols": 6,
                    "nRows": 4,
                    "spacing": width * 0.075,
                    "xPos": width * 0.075,
                    "yPos": width * 0.075
                })
            },
            'fretboard': () => { 
                return new Fretboard({
                        height: height, 
                        xPos: 0,
                        yPos: 0,
                        fretSpacing: width * 0.15
                    })
            },
            'mountains': () => {
                return new Mountains({
                    nPeaks: 11,
                    slopeDistance: width * 0.1,
                    peakHeight: height,
                    xPos: width,
                    yPos: 0,
                    alignment: "right"
                })
            }
        }
        return ideograms[type]()
    }
    
    componentDidMount(){
        const canvas = this.state.canvasRef.current
        const ctx = canvas.getContext('2d')        
        const ideogram = this.getIdeogram(this.props.ideogramType, canvas.width, canvas.height)
        console.log(ideogram)
        ideogram.draw(ctx)

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