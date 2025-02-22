import React from "react";
import FacilityEntry from "./FacilityEntry";

export default function FacilitiesContainer({ entries }) {
  return (
    <div className="container-lg">
      {entries.map((entry, i) => (
        <FacilityEntry
          key={`facility-${i}`}
          entry={entry}
          onSelectItem={() => console.log(i)}
        >
        </FacilityEntry>
      ))}
    </div>
  );
}
