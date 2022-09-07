import React from "react"; //不是结构赋值，是文件内有多个暴露的形式

import { Routes, Route, Navigate, NavLink, useRoutes } from "react-router-dom";
import routes from "./routes/index";
import Header from "./test/components/Header";
const App = () => {
  //路由表
  const route = useRoutes(routes);
  return (
    <div>
      <Header></Header>
      <h1>React router dom</h1>
      <div style={{ display: "flex" }}>
        <ul>
          <li>
            <NavLink to="/about" className=" ">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
        </ul>
        <div>
          {/* <Routes>
            <Route path="/about" element={<About />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/" element={<Navigate to="/about" />}></Route>
          </Routes> */}
          {route}
        </div>
      </div>
    </div>
  );
};

export default App;
