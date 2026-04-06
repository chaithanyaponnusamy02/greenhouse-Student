import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GreenActivities from "./pages/GreenActivities";
import ActivityDetails from "./pages/ActivityDetails";
import Participation from "./pages/Participation";
import MyParticipation from "./pages/MyParticipation";
import Awareness from "./pages/Awareness";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "activities", Component: GreenActivities },
      { path: "activities/:id", Component: ActivityDetails },
      { path: "participate", Component: Participation },
      { path: "my-participation", Component: MyParticipation },
      { path: "awareness", Component: Awareness },
      { path: "notifications", Component: Notifications },
      { path: "profile", Component: Profile },
    ],
  },
]);
