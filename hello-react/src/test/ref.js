import React, { Component } from "react";

const TextInput = (props) => {
  return <input type="text" className="naenh" ref={props.inputRef} />;
};
export default class Ref extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef(null); //创建
  }
  clickS = () => {
    console.log(this.inputElement);
  };
  render() {
    return (
      <div>
        <p onClick={this.clickS}>点我</p>
        <TextInput inputRef={(el) => (this.inputElement = el)}></TextInput>
      </div>
    );
  }
}
