import React, { Component } from "react";
import { NavLink, Outlet } from "react-router-dom";
export default class Home extends Component {
  render() {
    return (
      <div style={{ marginLeft: "30px" }}>
        <h1>home</h1>
        <ul style={{ display: "flex" }}>
          <li style={{ marginRight: "20px" }}>
            <NavLink to="news">news</NavLink>
          </li>
          <li>
            <NavLink to="message">message</NavLink>
          </li>
        </ul>
        <Outlet></Outlet>
      </div>
    );
  }
}
