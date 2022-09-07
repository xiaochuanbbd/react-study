import React, { Component } from "react";

function withSubscription(WarppedComponent, selecetData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selecetData,
      };
    }
    componentDidMount() {
      console.log("====================================");
      console.log(selecetData);
      console.log("====================================");
    }
    render() {
      return <WarppedComponent data={this.state.data}></WarppedComponent>;
    }
  };
}
const component1 = (props) => {
  return <p>{props.data}</p>;
};
const component2 = (props) => {
  return <p> {props.data}</p>;
};
const C1 = withSubscription(component1, 1);
const C2 = withSubscription(component2, 2);
const Hoc = () => {
  return (
    <>
      <C1></C1>
      <C2></C2>
    </>
  );
};
export default Hoc;
