import { resetWarningCache } from "prop-types";
import React, { useRef, Component } from "react";
const LogProps = (props) => {
  const connectRef = useRef(null);
  return (
    <div>
      <FancyBotton ref={connectRef}>123</FancyBotton>
    </div>
  );
};

const FancyBotton = (props) => {
  const handlerClick = () => {
    console.log(props.forwardRef);
  };
  return (
    <button ref={props.forwardRef} onClick={handlerClick}>
      {props.children}
    </button>
  );
};
//高阶组件
const Hoc = (Component) => {
  class Warpper extends React.Component {
    render() {
      return <Component {...this.props}></Component>;
    }
  }
};

export default Hoc();
