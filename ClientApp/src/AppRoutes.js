import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { Home } from "./components/Home";
import { Facilities } from "./components/facility/Facilities";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/projects',
    element: <AuthenticationGuard component={Facilities} />
  },
];

export default AppRoutes;
