import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  Col,
  Row,
} from "reactstrap";

/**
 * Product object
 * {
 *      Id,
 *      Name,
 *      ImageSrc,
 *      Link,
 *      Violations[]
 * }
 */

/**
 * Violation object
 * {
 *      Name,
 *      Link,
 *      Summary
 * }
 */

export default function Product({ product }) {
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <Card className="mb-3 p-3">
      <Row className="align-items-center">
        <Col xs="auto">
          <a href={product.Link} className="text-decoration-none text-dark">
            <img
              alt="Product"
              src={product.ImageSrc}
              className="img-fluid"
              style={{ maxHeight: "100px", width: "auto" }}
            />
          </a>
        </Col>
        <Col>
          <a href={product.Link} className=" text-dark">
            <h3>{product.Name}</h3>
          </a>
        </Col>
      </Row>
      {product.Violations.length !== 0 && <hr />}
      {product.Violations.map((violation, i) => {
        return (
          <>
            <Row>
              <Col>
                <Accordion flush open={open} toggle={toggle}>
                  <AccordionItem>
                    <AccordionHeader targetId={"" + i}>
                      {violation.Name}
                    </AccordionHeader>
                    <AccordionBody accordionId={"" + i}>
                      {violation.Summary}{" "}
                      <a href={violation.Link}>More Information</a>
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              </Col>
            </Row>
            {i !== product.Violations.length - 1 && <hr />}
          </>
        );
      })}
    </Card>
  );
}
