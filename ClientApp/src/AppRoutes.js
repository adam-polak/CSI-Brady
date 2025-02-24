import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { Home } from "./components/Home";
import CameraPage from "./components/camera/CameraPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Facilities } from "./components/facility/Facilities";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/facilities",
    element: <AuthenticationGuard component={Facilities} />,
  },
  {
    path: "/dashboard",
    element: <AuthenticationGuard component={Dashboard} />,
  },
  {
    path: "/camera",
    element: <AuthenticationGuard component={CameraPage} />,
  },
];

export default AppRoutes;
