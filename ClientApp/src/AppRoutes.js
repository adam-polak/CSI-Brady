import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Projects } from "./components/Projects";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <AuthenticationGuard component={Counter} />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/projects',
    element: <Projects />
  }
];

export default AppRoutes;
