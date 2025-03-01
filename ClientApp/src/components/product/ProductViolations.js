import React, { useState } from "react";
import {
  Row,
  Col,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

/**
 * Violation object
 * {
 *      Name,
 *      Link,
 *      Summary
 * }
 */

export default function ProductViolations({ violations }) {
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <>
      {violations.length !== 0 && <hr />}
      {violations.map((violation, i) => {
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
                      <a target="_blank" rel="noreferrer" href={violation.Link}>
                        More Information
                      </a>
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              </Col>
            </Row>
            {i !== violations.length - 1 && <hr />}
          </>
        );
      })}
    </>
  );
}
