import React from "react";
import FilterTag from "./FilterTag";

export default function FilterBar({ handleAdd, handleRemove, tags }) {
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;

    // Get input from filter's form
    const filterInput = form.children[0];

    // Add to filters array
    handleAdd(filterInput.value);

    // Reset input to be empty
    filterInput.value = "";
  }

  return (
    <div
      style={{ borderBottom: "2px solid lightgrey" }}
      className="pt-4 bg-grey"
    >
      <div>
        <div className="text-center">
          <form onSubmit={handleSubmit}>
            <input
              className="rounded-3 p-2"
              type="text"
              placeholder="Add filters"
              style={{
                border: "0px",
                marginRight: ".5em",
                height: "2.4em",
                width: "50%",
                display: "inline-block",
              }}
              name="filter"
            />
            <button
              type="submit"
              style={{ display: "inline-block", color: "rgb(255, 255, 255)" }}
              className="btn btn-success mb-1"
            >
              +
            </button>
          </form>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          className="d-flex justify-content-center mb-1"
          style={{
            width: "100%",
            flex: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "90%",
              padding: "0 10px",
              overflowX: "auto",
              display: "flex",
              flexWrap: "nowrap",
              gap: "8px",
            }}
          >
            {tags.map((tag, i) => (
              <div
                key={`tag-${i}`}
                style={{ flexShrink: 0 }} // Safeguard to prevent items from shrinking
              >
                <FilterTag tag={tag} index={i} onSelectItem={handleRemove} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
