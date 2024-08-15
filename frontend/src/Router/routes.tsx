import {Home, TrackBoard, FlowChart,Login} from "@pages";

const routes: Routes[] = [
  {
    title: "Home",
    path: "/",
    description: "home",
    element: <Home />,
  },
  {
    title: "Tracker",
    path: "/track",
    description: "track",
    element: <TrackBoard />,
  },
  {
    title: "FlowChart",
    path: "/flow",
    description: "flowchart",
    element: <FlowChart />,
  },
  {
    title: "login",
    path: "/login",
    description: "Login",
    element: <Login />,
  },
];

export default routes;
