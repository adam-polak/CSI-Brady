import React, { Component } from "react";
import FilterBar from "./FilterBar";
import ProjectsContainer from "./ProjectsContainer";
// import Logout from "./Logout"q

export class Projects extends Component {
  
  render() {
    const entries = ["Quad", "Husco", "Brady"];
    return (
      <div>
        <h1 style={{textAlign: "center"}}>Facilities</h1>
        {/* <Logout /> */}
        <FilterBar />
        <ProjectsContainer entries={entries} />
      </div>
    );
  }
}
