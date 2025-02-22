import React from "react";
import { Button, CardTitle, CardText } from "reactstrap";
import { Card } from "reactstrap";

/**
 * facility object
 * {
 * Address,
 * CompanyName,
 * CompanyImgLink
 * }
 */

export default function FacilityEntry({ facility, onSelectItem }) {
  // const style = {
  //   borderStyle: "solid",
  //   textAlign: "center",
  //   margin: "10px",
  // };

  console.log(facility);

  return (
    <div>
      <Card>
        <Button onClick={onSelectItem}>
          <CardTitle tag="h5">{facility.CompanyName}</CardTitle>
          <CardText>{facility.Address}</CardText>
        </Button>
      </Card>
    </div>
  );
}
