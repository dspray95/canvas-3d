import React from "react";
import "./App.css";
import BasicRenderer from "./components/Renderer";
import { Skills } from "./components/Skills";
import { Title } from "./components/Title";
import { Icons } from "./components/Icons";
import { IdeogramCanvas } from "./components/ideograms/IdeogramCanvas";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <BasicRenderer />
        <Title/>
        <Icons/>
        <Skills/>

        <IdeogramCanvas 
          ideogramType="morse-ogham"
          width={window.innerWidth * 0.1}
          height={window.innerHeight  * 0.7}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0
          }}
        />
        <IdeogramCanvas 
          ideogramType="neural-net"
          width={window.innerWidth * 0.2}
          height={window.innerHeight  * 0.2}
          style={{
            position: "fixed",
            top: "5vh",
            left: "3vw"
          }}
        />
        <IdeogramCanvas 
          ideogramType="fretboard"
          width={window.innerWidth * 0.15}
          height={window.innerHeight * 0.04}
          style={{
            position: "fixed",
            top: 0,
            right: 0
          }}
        />
      </div>
    </div>

  );
}

export default App;
