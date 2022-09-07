import About from "../test/pages/About/About";
import Home from "../test/pages/Home/Home";
import News from "../test/pages/Home/News";
import Message from "../test/pages/Home/Message";
import Detail from "../test/pages/Home/Detail";
import { Navigate } from "react-router-dom";
export default [
  {
    path: "/home",
    element: <Home></Home>,
    children: [
      {
        path: "news",
        element: <News></News>,
      },
      {
        path: "message",
        element: <Message></Message>,
        children: [
          {
            path: "Detail",
            element: <Detail></Detail>,
          },
        ],
      },
    ],
  },
  {
    path: "/about",
    element: <About></About>,
  },
  {
    path: "/",
    element: <Navigate to="/about" />,
  },
];
