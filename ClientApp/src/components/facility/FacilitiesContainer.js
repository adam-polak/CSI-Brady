import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacilityEntry from "./FacilityEntry";
import FilterBar from "../filter/FilterBar";
import { LoadingSpinner } from "../loading/Loading";

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
            <div className="mb-3" key={`facility-div-${i}`}>
              <FacilityEntry
                key={`facility-${i}`}
                facility={facility}
                onSelectItem={() => handleSelectEntry(facility.Id, facility.Address, facility.CompanyName)}
              />
            </div>
      ))}
    </div>
  );
}

export default function FacilitiesContainer({ facilities, loading }) {
  const [filters, setFilters] = useState([]);
  const nav = useNavigate();

  const handleSelectEntry = (i, address) => {
    nav(`/facility/${i}/${address}`);
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
    <div>
      <FilterBar
        handleAdd={addToFilters}
        handleRemove={removeFromFilters}
        tags={filters}
      />
      <div style={{height: "80%"}} className="container-lg p-2">
        {loading && <LoadingSpinner />}
        {!loading && <FilteredFacilities handleSelectEntry={handleSelectEntry} facilities={facilities} filters={filters} />}
      </div>
    </div>
  );
}
