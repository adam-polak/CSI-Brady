import React, { Component } from "react";
import FacilitiesContainer from "./FacilitiesContainer";

export class Facilities extends Component {
  constructor(props) {
    super(props);
    this.state = { facilities: [], loading: true };
  }

  componentDidMount() {
    this.loadFacilities();
  }

  async loadFacilities() {
    const result = await fetch('/facilityapi/facilities');
    const facilities = JSON.parse(await result.text());
    console.log(facilities[0].CompanyImgSrc)
    this.setState({ facilities: facilities, loading: false });
  }

  render() {
    const { facilities, loading } = this.state;

    return (
      <div className="bg-grey" style={{height: "94vh"}}>
        <FacilitiesContainer loading={loading} facilities={facilities} />
      </div>
    );
  }
}
