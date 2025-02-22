import React, { Component } from "react";
import FilterBar from "../filter/FilterBar";
import FacilitiesContainer from "./FacilitiesContainer";
import Logout from "../Logout"

export class Facilities extends Component {
  render() {
    const entries = ["Quad", "Husco", "Brady"];
    return (
      <div>
        <h1 style={{textAlign: "center"}}>Facilities</h1>
        <Logout />
        <FilterBar />
        <FacilitiesContainer entries={entries} />
      </div>
    );
  }
}
