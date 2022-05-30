import React from "react";
import "./App.css";
import { Skills } from "./components/Skills";
import { Title } from "./components/Title";
import { Icons } from "./components/Icons";
import { IdeogramCanvas } from "./components/ideograms/IdeogramCanvas";
import { EngineRenderer } from "./components/Renderer";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <EngineRenderer/>
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
        <IdeogramCanvas
          ideogramType="mountains"
          width={window.innerWidth * 0.135}
          height={window.innerHeight*0.04}
          style={{
            position: "fixed",
            right: -window.innerWidth * 0.012,
            bottom: window.innerHeight * 0.35
          }}
        />
        <IdeogramCanvas
          ideogramType="mountains"
          width={window.innerWidth * 0.135}
          height={window.innerHeight*0.04}
          style={{
            position: "fixed",
            right: 0,
            bottom: window.innerHeight * 0.4
          }}
        />
      </div>
    </div>

  );
}

export default App;
