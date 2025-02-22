import React from "react";
import { Button, Card, CardTitle, CardText } from "reactstrap";

/**
 * facility object
 * {
 * Address,
 * CompanyName,
 * CompanyImgLink
 * }
 */

export default function FacilityEntry({ facility, onSelectItem }) {
  console.log(facility);

  return (
    <div>
      <Card>
        <Button onClick={onSelectItem}>
          <div
            className="FacilityContainer"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <img
                alt={facility.CompanyName + " Logo"}
                src={facility.CompanyImgLink}
                width="50px"
                style={{ marginRight: "25px" }}
              />
            </div>
            <div>
              <CardTitle tag="h5">{facility.Address}</CardTitle>
              <CardText>{facility.CompanyName}</CardText>
            </div>
          </div>
        </Button>
      </Card>
    </div>
  );
}
