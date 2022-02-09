import React from "react";
import "./App.css";
import BasicRenderer from "./components/RenderComponent";
import { Skills } from "./components/Skills";
import { Title } from "./components/Title";
import { Icons } from "./components/Icons";
function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <BasicRenderer />
        <Title/>
        <Icons/>
        <Skills/>
      </div>
    </div>

  );
}

export default App;
