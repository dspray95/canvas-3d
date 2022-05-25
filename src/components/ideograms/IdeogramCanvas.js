import React, { useRef, useEffect, Component } from 'react'
import { Fretboard } from '../../js/game/vaporwave-canyon/gui/Fretboard'
import { Morse } from '../../js/game/vaporwave-canyon/gui/Morse'
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
                // return new Mountains({

                // })
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
// const IdeogramCanvas = props => {

//     const canvasRef = useRef(null)

//     useEffect(() => {
//         const canvas = canvasRef.current
//         const ctx = canvas.getContext('2d')

//         const ideogram = new Morse({
//             "ditDahList": ".... .. .-. . / -- .",
//             "spacing": 10, 
//             "leadLength": 250, 
//             "trailLength": 100, 
//             "xPos": canvas.width * 0.2, 
//             "yPos": canvas.height * 0.7
//         })
//         // ctx.fillRect(0, 0, canvas.width, canvas.height)
//         ideogram.draw(ctx)
//     })

//     return <canvas ref={canvasRef} {...props} style={{
//         position: "fixed",
//         bottom: 0,
//         left: 0,
//         width: "20vw",
//         height: "70vh"
//     }}/> 
// }

export { IdeogramCanvas }