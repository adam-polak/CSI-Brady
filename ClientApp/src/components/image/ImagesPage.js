import { Component } from "react";
import { useParams } from "react-router-dom";
import NavHeader from "../header/NavHeader";

export function ImagesPageWrapper() {
    const { areaId, productId } = useParams();

    return <ImagesPage areaId={areaId} productId={productId} />
}

export class ImagesPage extends Component {
    
    render() {
        return (
            <div className="bg-grey" style={{height: "94vh"}}>
                <NavHeader />
                <h1>Images Page</h1>
            </div>
        );
    }
}