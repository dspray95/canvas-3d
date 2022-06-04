import React, { Component } from "react";
import { GitHub } from "../ico/GitHub";
import { LinkedIn } from "../ico/LinkedIn";

class Icons extends Component{

  render(){
    return (
      <div 
        id="socialIcons"
        style={{
          display: "flex",
          position: "relative",
          // width: "100vw",
          height: "10vh",
          top: "10vh",
          justifyContent: "center"
        }}
      >
        <div className="icon" style={{position: "relative"}}>
          <LinkedIn iconClass='icoMain' doLink={true}></LinkedIn>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="icon" style={{position: "relative"}}>
          <GitHub iconClass='icoMain' doLink={true}></GitHub>
        </div>
      </div>
    )
  }
}

export { Icons }