import React, { Component } from "react";
import { FretboardConfig, MorseConfig, MountainsConfig, NeuralNetConfig } from "../config/IdeogramConfig";
import { IdeogramCanvas } from "./IdeogramCanvas";

class IdeogramContainer extends Component{

    constructor(props){
        super(props)
        this.state = {
            configs: {
                "morse-ogham": this.getConfig("morse-ogham"),
                "neural-net": this.getConfig("neural-net"),
                "fretboard": this.getConfig("fretboard"),
                "mountains": this.getConfig("mountains")
            }
        }
    }

    componentDidMount(){
        window.addEventListener("resize", this.onResize.bind(this))
    }

    orientation(){
        if(window.innerHeight > window.innerWidth){
            return "PORTRAIT"
        } else {
            return "LANDSCAPE"
        }
    }

    getConfig(type){
        return {
            "morse-ogham": MorseConfig,
            "neural-net": NeuralNetConfig,
            "fretboard": FretboardConfig,
            "mountains": MountainsConfig 
        }[type][this.orientation()]
    }

    onResize(){
        this.setState({
            configs: {
                "morse-ogham": this.getConfig("morse-ogham"),
                "neural-net": this.getConfig("neural-net"),
                "fretboard": this.getConfig("fretboard"),
                "mountains": this.getConfig("mountains")
            }
        })
    }

    render(){
        console.log(this.state.configs)
        const {
            "morse-ogham": morseOghamConfig, 
            "neural-net": neurlNetConfig,
            "fretboard": fretboardConfig, 
            "mountains": mountainsConfig
        } = this.state.configs

        return (
            <div>
                <IdeogramCanvas 
                    ideogramType="morse-ogham"
                    config={morseOghamConfig}
                    width={window.innerWidth * morseOghamConfig.WIDTH}
                    height={window.innerHeight * morseOghamConfig.HEIGHT}
                    style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0
                    }}
                />
                <IdeogramCanvas 
                    ideogramType="neural-net"
                    config={neurlNetConfig}
                    width={window.innerWidth * neurlNetConfig.WIDTH}
                    height={window.innerHeight * neurlNetConfig.HEIGHT}
                    style={{
                        position: "fixed",
                        top: window.innerHeight * neurlNetConfig.TOP,
                        left:  window.innerHeight * neurlNetConfig.LEFT
                    }}
                />
                <IdeogramCanvas 
                    ideogramType="fretboard"
                    config={fretboardConfig}
                    width={window.innerWidth * fretboardConfig.WIDTH}
                    height={window.innerHeight * fretboardConfig.SCREEN_HEIGHT}
                    style={{
                        position: "fixed",
                        top: "0",
                        right: "0"
                    }}
                />
                <IdeogramCanvas 
                    ideogramType="mountains"
                    config={mountainsConfig}
                    width={window.innerWidth * mountainsConfig.WIDTH}
                    height={window.innerHeight * mountainsConfig.HEIGHT}
                    style={{
                        position: "fixed",
                        bottom: window.innerHeight * mountainsConfig.UPPER.BOTTOM,
                        right: mountainsConfig.UPPER.RIGHT
                    }}
                />  
                <IdeogramCanvas 
                    ideogramType="mountains"
                    config={mountainsConfig}
                    width={window.innerWidth * mountainsConfig.WIDTH}
                    height={window.innerHeight * mountainsConfig.HEIGHT}
                    style={{
                        position: "fixed",
                        bottom: window.innerHeight * mountainsConfig.LOWER.BOTTOM,
                        right: window.innerWidth * mountainsConfig.LOWER.RIGHT
                    }}
                />
            </div>
        )
    }
}

export { IdeogramContainer }