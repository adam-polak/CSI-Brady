import React, { Component } from "react";
import AreaEntry from "./AreaEntry";
import Leaderboard from "../icons/Leaderboard";
import { Input } from "reactstrap";
import NavHeader from "../header/NavHeader";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../loading/Loading";

/**
 * area object
 * {
 *      Id,
 *      Code
 * }
 */

export function FacilityPageWrapper() {
  const { facilityId, address } = useParams();
  const nav = useNavigate();

  return <FacilityPage address={address} facilityId={facilityId} nav={nav} />
}

export class FacilityPage extends Component {
  constructor(props) {
    super(props);
    this.state = { facility: null, searchTerm: "", areas: [], isLoading: true };
  }

  componentDidMount() {
    this.loadFacility();
    this.loadAreas();
  }

  async loadFacility() {
    const { facilityId } = this.props;
    const result = await fetch('facilityapi/facility/' + facilityId);
    const facility = JSON.parse(await result.text());
    this.setState({ facility: facility });
  }

  async loadAreas() {
    const { facilityId } = this.props;
    const result = await fetch('/facilityapi/areas/' + facilityId);
    const areas = JSON.parse(await result.text());
    this.setState({ areas: areas, isLoading: false });
  }

  render() {

    const { nav, address } = this.props;
    const { searchTerm, areas, isLoading, facility } = this.state;

    const filteredAreas = isLoading 
      ? [] 
      : areas.filter((area) =>
        area.Code.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const handleSearchChange = (e) => {
      this.setState({ searchTerm: e.target.value });
    };

    function streetAndCity() {
      const arr = address.split(',');

      return `${arr[0]}, ${arr[1]}`;
    }

    const fixedAddress = streetAndCity();

    return (
      <div style={{ height: "94vh" }} className="bg-grey">
        <NavHeader />
        <div className="d-flex pt-4 px-5 pb-2 gap-1 align-items-center justify-content-start">
          <div style={{width: "25%"}}>
            {
              facility && <img
                  alt={facility.CompanyName + " Logo"}
                  src={facility.CompanyImgSrc}
                  width="50px"
                  style={{ alignItems: "center" }}
                />
            }
          </div>
          <div style={{ fontSize: "18px", width: "80%" }}>
              {fixedAddress}
          </div>
          <div>
            <button onClick={() => nav(`/leaderboard/${fixedAddress}`)} className="btn">
              <Leaderboard />
            </button>
          </div>
        </div>
        <div className="">
          <div className="px-5">
            <Input
              placeholder="Search..."
              onChange={handleSearchChange}
              value={searchTerm}
            />
          </div>
          <hr className="mx-4"/>
        </div>
        <div
          className="px-4 pb-4 pt-2 d-flex flex-column gap-3 mt-3"
          style={{ overflowY: "scroll", height: "57%" }}
        >
          {isLoading && <LoadingSpinner />}
          {filteredAreas.map((area, i) => (
            <button onClick={() => nav(`/area/${area.Id}`)} key={`area-btn-${i}`} className="btn">
              <AreaEntry key={`area-entry-${i}`} facility={area} />
            </button>
          ))}
        </div>
      </div>
    );
  }
}
