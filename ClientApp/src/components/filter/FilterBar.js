import React from "react";
import FilterTag from "./FilterTag";
import "./FilterBar.css";

export default function FilterBar({ handleAdd, handleRemove, tags }) {
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;

    // Get input from filter's form
    const filterInput = form.children[0].children[0];

    // Add to filters array
    handleAdd(filterInput.value);

    // Reset input to be empty
    filterInput.value = "";
  }

  return (
    <div className={tags.length === 0 ? "FilterBarContainer mb-3" : ""}>
      <div className="FilterSearch">
        <form onSubmit={handleSubmit}>
          <label>
            Filter: <input name="filter" />
          </label>
          <button type="submit">+</button>
        </form>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        className="TagContainer mb-3"
        style={{
          width: "100%",
          overflowX: "auto",
          display: "flex",
          flexWrap: "nowrap",
          gap: "8px",
          padding: "8px 0",
        }}
      >
        {tags.map((tag, i) => (
          <div
            key={`tag-${i}`}
            style={{ flexShrink: 0 }} // Safeguard to prevent items from shrinking
          >
            <FilterTag tag={tag} index={i} onSelectItem={handleRemove}/>
          </div>
        ))}
      </div>
    </div>
  );
}
