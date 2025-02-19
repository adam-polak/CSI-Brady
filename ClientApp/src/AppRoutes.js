import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { Home } from "./components/Home";
import { Projects } from "./components/Projects";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/projects',
    element: <AuthenticationGuard component={Projects} />
  },
];

export default AppRoutes;
