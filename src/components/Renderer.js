import React, { Component } from "react";
import { Color } from "../js/tools/Colors";
import { Worldspace } from "../js/engine/Worldspace";
import { CanyonWorld} from "../js/game/vaporwave-canyon/CanyonWorld"
import { NoiseToCanvas } from "../js/game/vaporwave-canyon/scripts/NoiseToCanvas";
import { CubeWorld } from "../js/game/vaporwave-canyon/CubeWorld";

function handleKeyPress(event) {
  console.log(event.key)
}

export default class BasicRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      // particleHandler: new ParticleHandler(
      //   20,
      //   window.innerWidth,
      //   window.innerHeight
      // ),
      noise: new NoiseToCanvas(),
      worldspace: new CanyonWorld(
        window.innerWidth,
        window.innerHeight,
        window.innerWidth,
        window.innerWidth,
        window.innerHeight,
        "perspective"
      )
      // worldspace: new CubeWorld(
      //   window.innerWidth,
      //   window.innerHeight,
      //   window.innerWidth,
      //   window.innerWidth,
      //   window.innerHeight,
      //   "perspective"
      // )
    };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.animationFrameRequest = requestAnimationFrame(
      this.updateAnimationState
    );
  }

  // This triggers the change in frame inside the canvas animation interface
  updateAnimationState() {
    this.setState((prevState) => ({ vertices: prevState.vertices + 1 }));
    this.animationFrameRequest = requestAnimationFrame(
      this.updateAnimationState
    );
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrameRequest);
  }

  render() {
    return (
      <CanvasAnimationInterface
        width={this.state.width}
        height={this.state.height}
        worldspace={this.state.worldspace}
        noise={this.state.noise}
        tabIndex="0" 
        onKeyDown={this.onKeyPressed}
      />
    );
  }
}

class CanvasAnimationInterface extends React.Component {
  constructor(props) {
    super(props);
    this.storeContext = this.storeContext.bind(this);
    this.state = {
      perspective: this.props.width * 0.8,
      projectionCentreX: this.props.width * 0.5,
      projectionCentreY: this.props.height * 0.5,
      fov: 1.0 / Math.tan(90 / 2.0),
      aspectRatio: this.props.width / this.props.height,
    };
  }

  // Run in the 'base canvas' component to pass the context up
  storeContext(canvasContext) {
    this.ctx = canvasContext;
  }

  componentDidUpdate() {
    this.canvasDraw(this.ctx, this.props.width, this.props.height);
  }

  canvasDraw(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = this.props.worldspace.backgroundColor.toHtmlRgba()
    ctx.fillRect(0, 0, width, height);
    this.props.worldspace.tick(ctx);
  }

  render() {
    return (
      <NonUpdatingCanvas
        width={this.props.width}
        height={this.props.height}
        parentCanvasRef={this.storeContext}
      />
    );
  }
}

class NonUpdatingCanvas extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas
        className="terrainCanvas"
        width={this.props.width}
        height={this.props.height}
        ref={(node) =>
          node ? this.props.parentCanvasRef(node.getContext("2d")) : null
        }
        onKeyDown={this.handleKeyPress} 
      />
    );
  }
}
