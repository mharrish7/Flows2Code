import {Home, TrackBoard, FlowChart} from "@pages";

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
];

export default routes;
