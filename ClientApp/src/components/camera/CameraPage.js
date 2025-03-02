import React from "react";
import Camera from "./Camera";
import { Container } from "reactstrap";
import NavHeader from "../header/NavHeader";
import { useParams } from "react-router-dom";

export default function CameraPage() {
  const { areaId } = useParams();

  return (
    <div className="bg-grey" style={{height: "94vh"}}>
      <div style={{width: "100%"}}>
        <NavHeader />
      </div>
      <Container fluid className="text-center p-2" style={{width: "90%"}}>
        <Camera areaId={areaId} />
      </Container>
    </div>
  );
}
