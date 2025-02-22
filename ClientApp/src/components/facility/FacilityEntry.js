import React from "react";
import { Button } from 'reactstrap';

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
      <Button onClick={onSelectItem}>
        test
      </Button>
    </div>
  );
}
