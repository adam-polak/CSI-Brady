import React from "react";
import FilterTag from "./FilterTag";
import { Container, Row, Col, Badge } from "reactstrap";
import "./FilterBar.css";

export default function FilterBar({ handleAdd, tags }) {
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;

    // Get input from filter's form
    const filterInput = form.children[0].children[0];
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
      <Container className="TagContainer mb-3">
        <Row>
          {tags.map((tag, i) => (
            <Col>
              <Badge className="mt-2 mb-2 p-2">
                <FilterTag key={`tag-${i}`}>{tag}</FilterTag>
              </Badge>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
