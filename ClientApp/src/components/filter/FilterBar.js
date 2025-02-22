import React from "react";
import "./FilterBar.css";

export default function FilterBar() {
  return (
    <div className="FilterBarContainer">
      <label>
        Filter: <input name="filter" />
      </label>
    </div>
  );
}
