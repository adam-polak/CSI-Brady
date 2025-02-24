import React from "react";
import FilterTag from "./FilterTag";
import "./FilterBar.css";
import { Container, Row, Col } from "reactstrap";

function FilterBarHeader() {
  return (
    <>
      <Container fluid className="header-style bg-brady p-3">
        <Row>
          <Col>
            <img 
              src="brady-logo.png"
              alt="Brady logo"
              height={"30px"}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

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
    <div style={{borderBottom: "2px solid lightgrey"}} className="bg-grey">
      <FilterBarHeader />
      <div 
        className={tags.length === 0 ? "FilterBarContainer" : ""}
      >
        <div className="text-center mt-3" >
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
                display: "inline-block" 
              }} 
              name="filter" />
            <button type="submit" style={{display: "inline-block"}} className="btn btn-success mb-1">+</button>
          </form>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          className="TagContainer mb-3"
          style={{
            width: "100%",
            flex: "row",
            justifyContent: "center"
          }}
        >
          <div style={{
            width: "90%",
            padding: "0 10px",
            overflowX: "auto",
            display: "flex",
            flexWrap: "nowrap",
            gap: "8px",
          }}>
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
      </div>
    </div>
  );
}
