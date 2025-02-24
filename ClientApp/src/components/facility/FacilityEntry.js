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
    <Card>
      <button className="btn" onClick={onSelectItem} style={{ paddingLeft: "0px" }}>
        <Container className="FacilityContainer">
          <Row>
            <Col xs="2" className="d-flex justify-content-center">
              <img
                alt={facility.CompanyName + " Logo"}
                src={facility.CompanyImgLink}
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
