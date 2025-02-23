import React, { useState } from "react";
import FacilityEntry from "./FacilityEntry";
import FilterBar from "../filter/FilterBar";

export default function FacilitiesContainer({ facilities }) {
  const [filters, setFilters] = useState([]);

  const handleSelectEntry = (i) => {
    console.log(i);
  };
  console.log(facilities[0].Address);
 
  function addToFilters(str) {
    console.log(str);
    if (str !== "") {
      setFilters([...filters, str]);
    }
  }

  return (
    <>
      <FilterBar handleAdd={addToFilters} tags={filters} />
      <div className="container-lg">
        {facilities.map(
          (facility, i) =>
            !filters.includes(facility) && (
              <FacilityEntry
                key={`facility-${i}`}
                facility={facility}
                onSelectItem={() => handleSelectEntry(i)}
              ></FacilityEntry>
            )
        )}
      </div>
    </>
  );
}
