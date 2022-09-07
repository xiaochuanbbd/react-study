import React, { Component } from "react";

const MyComponet = {
  DatePicker: function DatePicker(props) {
    return <div>hhhh {props.color}</div>;
  },
};
function MyComponetA() {
  return <MyComponet.DatePicker color="pink" />;
}

export default MyComponetA;
