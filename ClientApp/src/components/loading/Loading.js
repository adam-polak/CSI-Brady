import { Spinner } from "reactstrap";

export function LoadingSpinner() {
    return (
        <div style={{width: "100%"}} className="pt-4 d-flex justify-content-center gap-3">
            <Spinner className="text-brady" />
            <h2>Loading...</h2>
        </div>
    );
}