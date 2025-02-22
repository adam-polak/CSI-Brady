import React, { Component } from "react";
import FilterBar from "../filter/FilterBar";
import FacilitiesContainer from "./FacilitiesContainer";
import Logout from "../Logout"

export class Facilities extends Component {
  render() {
    const obj1 = {
      Address: "123 Good Road",
      CompanyName: "Husco",
      CompanyImgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR03ByQHEPHqOZVAbAVZFa1kFWDz7lcocGSSA&s"
    }

    const obj2 = {
      Address: "123 Bad Road",
      CompanyName: "Quad",
      CompanyImgLink: ""
    }

    const obj3 = {
      Address: "123 Spectacular Road",
      CompanyName: "Brady",
      CompanyImgLink: ""
    }

    const facilities = [obj1, obj2, obj3];

    return (
      <div>
        <h1 style={{textAlign: "center"}}>Facilities</h1>
        <Logout />
        <FilterBar />
        <FacilitiesContainer facilities={facilities} />
      </div>
    );
  }
}
