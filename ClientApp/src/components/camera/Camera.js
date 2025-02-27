import React, { useRef } from "react";
import Webcam from "react-webcam";
import { Container, Row, Col, Button } from "reactstrap";

export default function Camera({ handleCapture }) {
  const webcamRef = useRef();

  function capture() {
    const imageSrc = webcamRef.current.getScreenshot();
    handleCapture(imageSrc);
  }

  return (
    <Container fluid className="p-2" style={{height: "95%"}}>
      <Row className="d-flex justify-content-center mb-2">
        <Col xs="2" />
        <Col>
          <input type="file" />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            style={{height: "65vh"}}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "environment" }}
          />
          <div className="d-flex justify-content-center">
            <Col xs="3">
              <Button onClick={() => capture()} color="success" style={{height: "4em", width: "8em"}}>Capture</Button>
            </Col>
          </div>
      </Row>
    </Container>
  );
}
