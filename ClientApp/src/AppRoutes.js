import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { Home } from "./components/Home";
import CameraPage from "./components/camera/CameraPage";
import { DashboardWrapper } from "./components/dashboard/Dashboard";
import { Facilities } from "./components/facility/Facilities";
import { AreaPageWrapper } from './components/area/AreaPage';
import { FacilityPageWrapper } from "./components/facility/FacilityPage";

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
    path: "/dashboard/:facilityId/:facilityAddress/:companyName",
    element: <AuthenticationGuard component={DashboardWrapper} />,
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
  }
];

export default AppRoutes;
