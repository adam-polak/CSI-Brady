import React, { Component } from "react";
import ImageEntry from '../image/ImageEntry';
import { Col, Container, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import ArrowLeft from "../icons/Arrow";
import CameraIcon from "../icons/CameraIcon";
import Leaderboard from "../icons/Leaderboard";

export function DashboardWrapper() {
    const { facilityId, facilityAddress } = useParams();

    return <Dashboard facilityId={facilityId} facilityAddress={facilityAddress} />
}

const DashboardHeader = ({ facilityId }) => {
    const nav = useNavigate();

    return (
        <Container fluid className="header-style bg-brady pt-2">
            <Row>
                <Col className="d-inline-flex">
                    <button className="dashboard-btn btn text-white" onClick={() => nav("/facilities")}><ArrowLeft color="white" /></button>
                </Col>
                <Col>
                    <h1 className="text-center text-white">Dashboard</h1>
                </Col>
                <Col className="d-inline-flex justify-content-end">
                    <button onClick={() => nav("/camera/" + facilityId)} className="dashboard-btn btn text-white"><CameraIcon color="white" /></button>
                </Col>
            </Row>
        </Container>
    );
}

export default function ImagesContainer({ images }) {
    return (
        <Container style={{overflowY: "scroll", height: "80.6vh", width: "100vw"}} className="p-3" fluid>
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

function FacilityInfo({ facilityId, facilityAddress }) {
    const nav = useNavigate();

    return (
        <div>
            <div style={{borderBottom: "lightgrey solid 3px", height: "10vh", display: "flex", alignItems: "center", gap: "3px", paddingLeft: "3em", marginBottom: "1px"}} className="bg-grey">
                <div>
                    <button className="btn" onClick={() => nav("/leaderboard/" + facilityId)}>
                        <Leaderboard color={"#ffbf00"} />
                    </button>
                </div>
                <div className="bg-brady rounded-pill px-3 pt-2">
                    <h5 className="text-white">{facilityAddress}</h5>
                </div>
            </div>
        </div>
    );
}

export class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = { facility: null };
    }

    componentDidMount() {
        this.loadFacility();
    }

    async loadFacility() {
        const { facilityId } = this.props;
        const result = await fetch("/facility/" + facilityId);
        const facility = JSON.parse(await result.text());
        this.setState({ facility: facility });
    }

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

        const { facilityId, facilityAddress } = this.props;

        return (
            <div className="bg-grey" style={{height: "100vh", width: "100vw"}}>
                <DashboardHeader facilityAddress={facilityAddress} facilityId={facilityId} />
                <FacilityInfo facilityId={facilityId} facilityAddress={facilityAddress} />
                <ImagesContainer images={images} /> 
            </div>
        );
    }
}