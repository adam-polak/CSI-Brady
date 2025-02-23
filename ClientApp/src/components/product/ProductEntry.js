import { Card, CardBody, Container, Row, Col } from "reactstrap";

/**
 * product object
 * {
 *      Name,
 *      ImageSrc,
 *      Link
 * }
 */

export default function ProductEntry({ product }) {
    return (
        <>
            <Card>
                <CardBody>
                    <Container fluid>
                        <Row className="inline-block">
                            <Col
                                xs="3"
                            >
                                <img
                                    alt="Product"
                                    height={"50px"}
                                    src={product.ImageSrc}
                                />
                            </Col>
                            <Col>
                                <h4 className="text-start mt-2"><a target="_blank" rel="noreferrer" href={product.Link}>{product.Name}</a></h4>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        </>
    );
}