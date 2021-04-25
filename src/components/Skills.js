import React, { Component } from "react";

class Skills extends Component{

  render() {
    let style = {}
    let lineBreak = ""
    if (window.innerWidth < window.innerHeight){
      style = {
        fontSize: "0.4rem", 
        paddingLeft: "10%",
        paddingRight: "10%",
        lineHeight: "1rem",
      }
      lineBreak = <br></br>
    }
    return(
      <div className='skillsContainer' style={style}>
        {">PYTHON/FLASK >MACHINE LEARNING"} {lineBreak}
        {">JS/REACT"}
      </div>
    )
  }

}

export { Skills }