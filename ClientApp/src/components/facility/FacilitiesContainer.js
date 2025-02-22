import React from "react";
import FacilityEntry from "./FacilityEntry";

export default function FacilitiesContainer({ entries }) {

  const handleSelectItem = (entry) => console.log(entry);

  return (
    <div>
      {entries.map((entry) => (
        <FacilityEntry
          key={entry} // TODO: key={project.id}
          onSelectItem={handleSelectItem}
        >
          {entry}
        </FacilityEntry>
      ))}
    </div>
  );
}
