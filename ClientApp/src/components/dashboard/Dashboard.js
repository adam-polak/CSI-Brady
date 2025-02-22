import React, { Component } from "react";
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

export class Dashboard extends Component {

    render() {
        return (
            <DashBoardHeader />
            
        );
    }
}