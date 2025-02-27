import React from "react";
import AreaEntry from "./AreaEntry";
import Leaderboard from "../icons/Leaderboard";
import { Col, Row } from "reactstrap";

export function FacilityPage() {
  const area1 = {
    Name: "Floor 1",
    Code: 4235,
  };

  const facility = {
    Areas: [area1],
  };

  return (
    <div style={{ height: "93vh" }} className="bg-grey pt-3">
      <div className="d-flex p-4 gap-5 align-items-end">
        <div style={{ fontSize: "36px" }}>Facility Name</div>
        <div>
          <button className="btn">
            <Leaderboard />
          </button>
        </div>
      </div>

      <div className="p-4">
        {facility.Areas.map((area) => (
          <AreaEntry facility={area}></AreaEntry>
        ))}
      </div>
    </div>
  );
}
