import React, { Component } from "react";
import FilterBar from "../filter/FilterBar";
import FacilitiesContainer from "./FacilitiesContainer";
import Logout from "../Logout"

export class Facilities extends Component {
  render() {
    const obj1 = {
      Address: "9123 Good Road",
      CompanyName: "Husco",
      CompanyImgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR03ByQHEPHqOZVAbAVZFa1kFWDz7lcocGSSA&s"
    }

    const obj2 = {
      Address: "4213 Bad Road",
      CompanyName: "Quad",
      CompanyImgLink: "https://static.stocktitan.net/company-logo/quad-lg.webp"
    }

    const obj3 = {
      Address: "8543 Spectacular Road, Milwaukee, WI 53534",
      CompanyName: "Brady",
      CompanyImgLink: "https://cdn.worldvectorlogo.com/logos/brady-3.svg"
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
