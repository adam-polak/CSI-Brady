import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
} from "reactstrap";

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
    <Card style={{width: "100%"}}>
      <button className="btn" onClick={onSelectItem}>
        <Container className="FacilityContainer">
          <Row>
            <Col xs="2" className="d-flex justify-content-center">
              <img
                alt={facility.CompanyName + " Logo"}
                src={facility.CompanyImgSrc}
                width="50px"
                style={{ alignItems: "center" }}
              />
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
