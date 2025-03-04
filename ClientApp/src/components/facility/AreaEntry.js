import React from "react";
import { Card } from "reactstrap";
import RightChevron from "../icons/RightChevron";

export default function AreaEntry({ facility }) {
  return (
    <Card className="p-4 bg-white">
      <div className="d-flex align-items-center justify-content-between">
        <div className="fs-3 fw-bold text-dark text-uppercase letter-spacing-1">
          {facility.Code}
        </div>
        <div className="fs-5 text-secondary d-flex flex-column">
          <div>
            <span className="fw-4 text-primary">Products:</span>{" "}
            {facility.ViolationCount}
          </div>
          <div>
            <span className="fw-4 text-danger">Violations:</span>{" "}
            {facility.ViolationCount}
          </div>
        </div>
        <div className="text-muted">
          <RightChevron />
        </div>
      </div>
    </Card>
  );
}
