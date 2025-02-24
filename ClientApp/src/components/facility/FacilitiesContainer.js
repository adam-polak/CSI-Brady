import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacilityEntry from "./FacilityEntry";
import FilterBar from "../filter/FilterBar";

function FilteredFacilities({handleSelectEntry, facilities, filters}) {
  const arr = facilities.filter((f) => {
    if(filters.length === 0) {
      return true;
    }

    const lowercaseFilters = filters.map(x => x.toLowerCase());

    let ans = true;
    const address = f.Address.toLowerCase();
    const companyName = f.CompanyName.toLowerCase();
    for(let i = 0; i < lowercaseFilters.length; i++) {
      ans = ans && (address.includes(lowercaseFilters[i]) || companyName.includes(lowercaseFilters[i]));
    }

    return ans;
  });

  return (
    <div style={{overflowY: "scroll"}}>
      {arr.length === 0 
      ? <p className="text-center">*No facilities to display</p>
      : arr.map((facility, i) => (
            <div className="mb-3">
              <FacilityEntry
                key={`facility-${i}`}
                facility={facility}
                onSelectItem={() => handleSelectEntry(i)}
              />
            </div>
      ))}
    </div>
  );
}

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
      <div style={{height: "81.4vh"}} className="container-lg p-2">
        <FilteredFacilities handleSelectEntry={handleSelectEntry} facilities={facilities} filters={filters} />
      </div>
    </>
  );
}
