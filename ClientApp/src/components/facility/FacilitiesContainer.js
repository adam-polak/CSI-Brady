import React from "react";
import FacilityEntry from "./FacilityEntry";

export default function FacilitiesContainer({ facilities }) {
  const handleSelectEntry = (i) => {
    console.log(i);
  };

  return (
    <div className="container-lg">
      {facilities.map((facility, i) => (
        <FacilityEntry
          key={`facility-${i}`}
          facility={facility}
          onSelectItem={() => handleSelectEntry(i)}
        >
        </FacilityEntry>
      ))}
    </div>
  );
}
