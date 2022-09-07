import React, { Component, Fragment } from "react";
import { NavLink, Outlet } from "react-router-dom";
export default class About extends Component {
  render() {
    return (
      <Fragment>
        <h1>About</h1>
        <NavLink to="/about/aboutchild">aboutchild</NavLink>
        <br />
        <NavLink to="/about/aboutchild1 ">aboutchild1</NavLink>
        <h2>内容</h2>
        <Outlet />
      </Fragment>
    );
  }
}
