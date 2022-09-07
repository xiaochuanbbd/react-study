import React, { Component } from "react";

class Cat extends Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <div
        style={{
          width: "20px",
          height: "20px",
          background: "pink",
          position: "absolute",
          left: mouse.x,
          top: mouse.y,
        }}
      ></div>
    );
  }
}
class Mouse extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }
  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  };
  render() {
    return (
      <div style={{ height: "100vh" }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}
export default class MouseTracker extends Component {
  render() {
    return <Mouse render={(mouse) => <Cat mouse={mouse} />}></Mouse>;
  }
}
