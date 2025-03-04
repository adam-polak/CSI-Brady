import React from "react";
import { Card, CardTitle, CardText, Container, Row, Col } from "reactstrap";

/**
 * facility object
 * {
 * Address,
 * CompanyName,
 * CompanyImgLink
 * }
 */

export default function FacilityEntry({ facility, onSelectItem }) {
  return (
    <Card>
      <button
        className="btn"
        onClick={onSelectItem}
        style={{ paddingLeft: "0px" }}
      >
        <Container className="FacilityContainer">
          <Row>
            <Col xs="2" className="d-flex flex-column justify-content-center">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "50px",
                  overflow: "hidden",
                }}
              >
                <img
                  alt={facility.CompanyName + " Logo"}
                  src={facility.CompanyImgSrc}
                  width="50px"
                  style={{
                    alignItems: "center",
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </Col>
            <Col>
              <Row>
                <CardTitle tag="h5" style={{ textAlign: "left" }}>
                  {facility.Address}
                </CardTitle>
                <CardText style={{ textAlign: "left" }}>
                  {facility.CompanyName}
                </CardText>
              </Row>
            </Col>
          </Row>
        </Container>
      </button>
    </Card>
  );
}
