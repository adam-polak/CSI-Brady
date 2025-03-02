import { Component } from "react";
import NavHeader from "../header/NavHeader";
import { useParams } from "react-router-dom";

export function LeaderboardPageWrapper() {
    const { facilityId } = useParams();

    return <LeaderboardPage facilityId={facilityId} />
}

export class LeaderboardPage extends Component {
    render() {
        return (
            <div className="bg-grey" style={{height: "94vh"}}>
                <NavHeader />
                <h1>Leaderboard</h1>
            </div>
        )
    }
}