import React from "react";
import "./App.css";
import { Skills } from "./components/Skills";
import { Title } from "./components/Title";
import { Icons } from "./components/Icons";
import { IdeogramCanvas } from "./components/IdeogramCanvas";
import { EngineRenderer } from "./components/Renderer";
import { IdeogramContainer } from "./components/Ideograms";

function App() {

  return (
    <div className="App">
      <div className="wrapper">
        <EngineRenderer/>
        <Title/>
        <Icons/>
        <Skills/>
        <IdeogramContainer/>
      </div>
    </div>

  );
}

export default App;
