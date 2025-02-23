import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacilityEntry from "./FacilityEntry";
import FilterBar from "../filter/FilterBar";

export default function FacilitiesContainer({ facilities }) {
  const [filters, setFilters] = useState([]);
  const nav = useNavigate();

  const handleSelectEntry = (i) => {
    nav("/dashboard");
  };

  function addToFilters(str) {
    if (str !== "") {
      setFilters([...filters, str]);
    }
  }

  function removeFromFilters(i) {
    filters.splice(i, 1);
    setFilters([...filters]);
  }

  return (
    <>
      <FilterBar
        handleAdd={addToFilters}
        handleRemove={removeFromFilters}
        tags={filters}
      />
      <div className="container-lg">
        {facilities
          .filter(
            (facility) =>
              filters.length === 0 || filters.includes(facility.Address)
          )
          .map((facility, i) => (
            <FacilityEntry
              key={`facility-${i}`}
              facility={facility}
              onSelectItem={() => handleSelectEntry(i)}
            />
          ))}
      </div>
    </>
  );
}
