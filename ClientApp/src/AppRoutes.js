import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { Home } from "./components/Home";
import CameraPage from "./components/camera/CameraPage";
import { DashboardWrapper } from "./components/dashboard/Dashboard";
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
    path: "/dashboard/:facilityId",
    element: <AuthenticationGuard component={DashboardWrapper} />,
  },
  {
    path: "/camera/:facilityId",
    element: <AuthenticationGuard component={CameraPage} />,
  },
];

export default AppRoutes;
