import React, { Component } from "react";
import ImageEntry from '../image/ImageEntry';
import { Button, Col, Container, Row } from "reactstrap";

const DashBoardHeader = () => {
    return (
        <Container fluid>
            <Row className="mt-4">
                <Col className="d-inline-flex">
                    <Button>Back</Button>
                </Col>
                <Col>
                    <h1 className="text-center">Dashboard</h1>
                </Col>
                <Col className="d-inline-flex justify-content-end">
                    <Button>Camera</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default function ImagesContainer({ images }) {
    return (
        <Container style={{overflow: "scroll", height: "80vh"}} fluid>
            {images.map((image, i) => (
            <Row className="mb-4">
                <Col className="d-inline-flex justify-content-center">
                    <ImageEntry
                    key={`image-${i}`}
                    image={image}
                    />
                </Col>
            </Row>
            ))}
        </Container>
    );
}

export class Dashboard extends Component {
    render() {

        const product1 = {
            Name: "Printer",
            ImageSrc: "",
            Link: "https://www.google.com/"
        }

        const violation1 = {
            Name: "OSHA 22381",
            Link: "https://www.google.com/",
            Products: [product1]
        }

        const violation2 = {
            Name: "OSHA 4521",
            Link: "https://www.google.com/",
            Products: []            
        }

        const imageObj = {
            Date: "9/12/2024",
            TakenBy: "Bob Bobson",
            ImageSrc: "https://f.hubspotusercontent40.net/hubfs/3339696/navvis-factory-tour-header.jpg",
            Violations: [violation1, violation2]
        }

        const images = [];
        for(let i = 0; i < 10; i++) {
            images.push(imageObj);
        }

        return (
            <div>
                <DashBoardHeader />
                <hr />
                <ImagesContainer images={images} /> 
            </div>
        );
    }
}