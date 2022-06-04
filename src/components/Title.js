import React, { Component } from "react";
import { Icons } from "./Icons"

class Title extends Component{
  render() {
    const nameDivStyle = {
      marginLeft: "2rem",
      marginRight: "2rem",
      position: "absolute",
      // top: "17%"
    }

    return (
    
      <div 
        id='nameContainer'
        style={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          // width: "100vw",
          height: "25vh",
          top: "15vh",
          zIndex: 2
        }}
      >
        <div 
          id='davidSprayBase'
          style={nameDivStyle}
        >
          <div className='hello'>HI, I'M</div>
          <div className='nameText'>David Spray</div>
          <div className="writeCode">
            <span style={{fontFamily: "monospace"}}>I WRITE&nbsp;&nbsp;</span>
            <span className='gradient-text'>CODE</span>
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