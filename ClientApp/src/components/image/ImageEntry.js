import React, { useState } from "react";
import { Card, CardBody, Container, Row, Accordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap";

/**
 * image object
 * {
 *     Date,
 *     Violations[],
 *     TakenBy,
 *     ImageSrc,
 * }
 * 
 * violation object
 * {
 *      Name,
 *      Link,
 *      Products[]
 * },
 * 
 * product object
 * {
 *      Name,
 *      ImageSrc,
 *      Link
 * }
 */

export default function ImageEntry({ image }) {
    const [open, setOpen] = useState('');

    const toggle = (id) => {
        if(open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    }

    return (
        <div style={{width: "80%"}}>
            <Card>
                <CardBody className="pt-4">
                    <Container fluid>
                        <Row className="mb-2 text-center">
                            <h2>{image.Date}</h2>
                        </Row>
                        <Row>
                            <h4>Taken by: {image.TakenBy}</h4>
                        </Row>
                    </Container>
                    <img
                        height={"300px"}
                        width={"100%"}
                        alt="Card cap"
                        src={image.ImageSrc}
                    /> 
                </CardBody>
                <CardBody>
                    <Accordion flush open={open} toggle={toggle}>
                        {
                            image.Violations.length === 0
                            ? <h5 className="text-center">*No violations detected</h5>
                            : image.Violations.map((violation, i) => (
                                <AccordionItem>
                                    <AccordionHeader targetId={i}>{violation.Name}</AccordionHeader>
                                    <AccordionBody accordionId={i}>
                                        <Container fluid>
                                            <Row>
                                                <p>View more information <a target="_blank" rel="noreferrer" href={violation.Link}>here</a></p>
                                            </Row>
                                            {
                                                violation.Products.length === 0
                                                ? <Row><p>*No products to recommend</p></Row>
                                                : violation.Products.map(product => (
                                                    <Row>
                                                        <h2>{product.Name}</h2>
                                                    </Row>
                                                ))
                                            }
                                        </Container>
                                    </AccordionBody>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                </CardBody>
            </Card>
        </div>
    );
}