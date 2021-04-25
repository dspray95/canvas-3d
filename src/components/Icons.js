import React, { Component } from "react";
import { GitHub } from "../ico/GitHub";
import { LinkedIn } from "../ico/LinkedIn";

class Icons extends Component{

  render(){
    return (
      <div style={{display: "flex"}}>
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