import React from "react";
import "./FilterBar.css";

export default function FilterBar({ handleKeyUp }) {
  return (
    <div className="FilterBarContainer">
      <label>
        Filter: <input name="filter" onKeyUp={handleKeyUp}/>
      </label>
    </div>
  );
}
