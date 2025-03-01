import React from "react";
import { Card } from "reactstrap";
import RightChevron from "../icons/RightChevron";

/**
 * products object
 * {
 *      Products[]
 * }
 */

export default function AreaEntry({ facility }) {
  console.log(facility);
  return (
    <Card className="p-4">
      <div className="d-flex align-items-center justify-content-between">
        <div
          className="mx-4"
          style={{ fontSize: "24px", textDecoration: "underline" }}
        >
          {facility.Code}
        </div>
        <div>
          <button className="btn">
            <RightChevron />
          </button>
        </div>
      </div>
    </Card>
  );
}
