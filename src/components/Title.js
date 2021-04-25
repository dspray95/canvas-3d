import React, { Component } from "react";
import { Icons } from "./Icons"

class Title extends Component{
  render() {
    return (
      
      <div className='nameContainer'>
        <div className='nameDiv'>
          <div className='hello'>HI, I'M</div>
          <div className='nameText'>David Spray</div>
          <div className="writeCode">
            <span style={{fontFamily: "monospace"}}>I WRITE&nbsp;&nbsp;</span>
            <span className='gradient-text'>CODE</span>
          </div>

        </div>
        <div className='nameDiv'>
          <div className='nameText nameTextBlu'>David Spray</div>
        </div>
        <div className='nameDiv'>
          <div className='nameText nameTextRed'>David Spray</div>
        </div>
      </div>
    )
  }
}

export { Title }