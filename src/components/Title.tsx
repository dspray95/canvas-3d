import React, { CSSProperties, Component } from "react";
import { DisplayDimensions } from "../js/engine/rendering/DisplayDimensions";
import { DisplayMode } from "../js/engine/rendering/DisplayMode";
import { Color } from "../js/tools/Colors";

class Title extends Component<{}, {codeTextGradient: string}> {

  constructor(props: any) {
    super(props);

    this.state = {
      codeTextGradient: this.getCodeTextGradient()
    }
  }

  componentDidMount(): void {
    window.addEventListener("resize", this.onResize.bind(this))
  }

  getCodeTextGradient(){
    let codeTextGradient =  `linear-gradient(45deg, ${Color.MAGENTA.toHtmlRgba()}, ${Color.ELECTRIC_BLUE.toHtmlRgba()}`
    if(DisplayDimensions.getDisplayMode(window.innerWidth, window.innerHeight) === DisplayMode.VERTICAL){
      //The pink will get lost on vertical displays because of the pink on the terrain
      codeTextGradient =  `linear-gradient(45deg,  ${Color.LIGHTBLUE.toHtmlRgba()}, ${Color.ELECTRIC_BLUE.toHtmlRgba()}`
    }
    console.log(codeTextGradient)
    return codeTextGradient;
  }

  onResize(){
    this.setState({
      codeTextGradient: this.getCodeTextGradient(),
    })
  }

  render() {
    const nameDivStyle: CSSProperties = {
      marginLeft: "2rem",
      marginRight: "2rem",
      position: "absolute",
    }
    const nameContainerStyle: CSSProperties = {
      display: "flex",
      position: "relative",
      justifyContent: "center",
      height: "25vh",
      top: "15vh",
      zIndex: 2
    }

    const gradientTextStyle: CSSProperties = {
      backgroundImage: this.state.codeTextGradient
    }

    return (
      <div 
        id='nameContainer'
        style={nameContainerStyle}
      >
        <div 
          id='davidSprayBase'
          style={nameDivStyle}
        >
          <div className='hello'>HI, I'M</div>
          <div className='nameText'>David Spray</div>
          <div className="writeCode">
            <span style={{fontFamily: "monospace"}}>I WRITE&nbsp;&nbsp;</span>
            <span className='gradient-text' style={gradientTextStyle}>CODE</span>
          </div>

        </div>
        <div 
          id='davidSprayBlue'
          style={nameDivStyle}
        >
        <div className='nameText nameTextBlu'>David Spray</div>
        </div>
        <div 
          className='davidSprayPink'
          style={nameDivStyle}
        >
          <div className='nameText nameTextRed'>David Spray</div>
        </div>
      </div>
    )
  }
}

export { Title }