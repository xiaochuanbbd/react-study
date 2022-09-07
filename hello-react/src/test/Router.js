import AboutChild1 from "./pages/About/Child";
import AboutChild from "./pages/About/Child1";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
const route = [
  {
    path: "/about",
    element: <About />,
    children: [
      {
        path: "aboutchild",
        element: <AboutChild />,
      },
      {
        path: "aboutchild1",
        element: <AboutChild1 />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: <Home />,
  },
];

export default route;
