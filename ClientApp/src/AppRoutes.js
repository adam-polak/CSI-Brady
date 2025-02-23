import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { Home } from "./components/Home";
import { Camera } from "./components/camera/Camera";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Facilities } from "./components/facility/Facilities";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/facilities',
    element: <AuthenticationGuard component={Facilities} />
  },
  {
    path: '/dashboard',
    element: <AuthenticationGuard component={Dashboard} />
  },
  {
    path: '/camera',
    element: <AuthenticationGuard component={Camera} />
  }
];

export default AppRoutes;
