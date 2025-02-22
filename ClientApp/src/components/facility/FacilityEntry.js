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

  return (
    <div>
      <Card>
        <Button onClick={onSelectItem}>
          <CardTitle tag="h5">CompanyName</CardTitle>
          <CardText>1000 Address Rd. 53211</CardText>
        </Button>
      </Card>
    </div>
  );
}
