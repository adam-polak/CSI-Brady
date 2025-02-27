import React from "react";
import Camera from "./Camera";
import { Container } from "reactstrap";
import NavHeader from "../header/NavHeader";

export default function CameraPage() {
  return (
    <div className="bg-grey" style={{height: "93vh"}}>
      <div style={{width: "100%"}}>
        <NavHeader />
      </div>
      <Container fluid className="text-center p-2" style={{width: "90%"}}>
        <Camera />
      </Container>
    </div>
  );
}
