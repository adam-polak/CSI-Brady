import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { Home } from "./components/Home";
import CameraPage from "./components/camera/CameraPage";
import { Facilities } from "./components/facility/Facilities";
import { AreaPageWrapper } from './components/area/AreaPage';
import { FacilityPageWrapper } from "./components/facility/FacilityPage";
import { ImagesPageWrapper } from "./components/image/ImagesPage";
import { LeaderboardPageWrapper } from "./components/leaderboard/LeaderboardPage";
import { SubmissionPageWrapper } from "./components/submission/SubmissionPage";

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
    path: "/camera/:areaId",
    element: <AuthenticationGuard component={CameraPage} />,
  },
  {
    path: "/area/:areaId",
    element: <AuthenticationGuard component={AreaPageWrapper} />
  },
  {
    path: "facility/:facilityId/:address",
    element: <AuthenticationGuard component={FacilityPageWrapper} />
  },
  {
    path: "images/:areaId/:productId",
    element: <AuthenticationGuard component={ImagesPageWrapper} />
  },
  {
    path: "leaderboard/:facilityId",
    element: <AuthenticationGuard component={LeaderboardPageWrapper} />
  },
  {
    path: "submission/:areaId/:imageId",
    element: <AuthenticationGuard component={SubmissionPageWrapper} />
  }
];

export default AppRoutes;
