import React, { useState } from "react";
import AreaEntry from "./AreaEntry";
import Leaderboard from "../icons/Leaderboard";
import { Input } from "reactstrap";
import NavHeader from "../header/NavHeader";

/**
 * area object
 * {
 *      Code
 * }
 */

export function FacilityPage() {
  const area1 = {
    Code: "Floor 1",
  };

  const area2 = {
    Code: "Floor 2",
  };

  const area3 = {
    Code: "Room 31B",
  };

  const facility = {
    Areas: [area1, area2, area3, area1, area2, area3, area1, area2, area3],
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredAreas = facility.Areas.filter((area) =>
    area.Code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ height: "94vh" }} className="bg-grey pt-3">
      <NavHeader />
      <div className="d-flex pt-4 px-5 pb-2 gap-5 align-items-end">
        <div style={{ fontSize: "18px" }}>9123 Good Road, Milwaukee WI 53534</div>
        <div>
          <button className="btn">
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
        {filteredAreas.map((area, i) => (
          <button className="btn">
            <AreaEntry facility={area}></AreaEntry>
          </button>
        ))}
      </div>
    </div>
  );
}
