import React, { Component } from "react";
import ImageEntry from '../image/ImageEntry';
import { Button, Col, Container, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

const DashBoardHeader = () => {
    const nav = useNavigate();

    return (
        <Container fluid>
            <Row className="mt-4">
                <Col className="d-inline-flex">
                    <Button onClick={() => nav("/facilities")}>Back</Button>
                </Col>
                <Col>
                    <h1 className="text-center">Dashboard</h1>
                </Col>
                <Col className="d-inline-flex justify-content-end">
                    <Button onClick={() => nav("/camera")}>Camera</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default function ImagesContainer({ images }) {
    return (
        <Container style={{overflow: "scroll", height: "80vh"}} fluid>
            {images.map((image, i) => (
                <Row className="mb-4" key={`image-${i}`}>
                    <Col className="d-inline-flex justify-content-center">
                        <ImageEntry
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
            Name: "Brady M710 Label Printer",
            ImageSrc: "https://cdn-01-artemis.media-brady.com/Assets/ImageRoot/WPSAmericasWeb_Name/04/87/M710_Left_Angled_BWI-3d_seton_dam_4800487.jpg",
            Link: "https://www.seton.com/m710-labeler-2-label-width-from-brady-bid155.html"
        }

        const violation1 = {
            Name: "OSHA 1910.303(e)",
            Summary: "Electric equipment must have identification of manufacturer and ratings.",
            Link: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.303#1910.303(e)",
            Products: [product1]
        }

        const violation2 = {
            Name: "OSHA 4521",
            Summary: "",
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