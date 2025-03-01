import React from "react";
import { Card } from "reactstrap";
import RightChevron from "../icons/RightChevron";

export default function AreaEntry({ facility }) {
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
          <RightChevron />
        </div>
      </div>
    </Card>
  );
}
