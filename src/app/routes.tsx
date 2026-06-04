import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/landing-page";
import DashboardPage from "./pages/dashboard-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
]);
