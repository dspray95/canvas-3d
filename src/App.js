import React from "react";
import "./App.css";
import { Skills } from "./components/Skills";
import { Title } from "./components/Title";
import { Icons } from "./components/Icons";
import { EngineRenderer } from "./components/Renderer";
import { IdeogramContainer } from "./components/Ideograms";

function App() {

  return (
    <div className="App">
      <div className="wrapper">
        <EngineRenderer/>
        <div
          id="centrepiece"
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            justifyContent: "flex-start"
          }}
        > 
        
          <Title/>
          <Icons/>
        </div>
        <Skills/>
        <IdeogramContainer/>
      </div>
    </div>

  );
}

export default App;
