import { Component } from "react";
import NavHeader from "../header/NavHeader";
import { useParams } from "react-router-dom";
import LeaderboardEntry from "./LeaderboardEntry";
import { Card } from "reactstrap";

/**
 * User object
 * {
 *      Name,
 *      Score
 * }
 *
 * Facility object
 * {
 *      Address
 * }
 *
 */

const facility = {
  Address: "3256 Astor Rd, Milwaukee",
};

const user1 = {
  Name: "Bob Bobson",
  Score: 723,
};
const user2 = {
  Name: "Turbo Johnson",
  Score: 9999,
};
const user3 = {
  Name: "Brady Dev",
  Score: 12,
};
const user4 = {
  Name: "Kvothe",
  Score: 2,
};

const users = [user1, user2, user3, user4];

for (let i = 4; i < 50; ++i) {
  users[i] = user4;
}

users.sort((a, b) => b.Score - a.Score);

export function LeaderboardPageWrapper() {
  const { facilityId } = useParams();

  return <LeaderboardPage facilityId={facilityId} />;
}

export class LeaderboardPage extends Component {
  render() {
    return (
      <div className="bg-grey" style={{ height: "94vh" }}>
        <NavHeader />
        <h1 className="text-center mt-2">{facility.Address}</h1>
        <div className="px-4" style={{ height: "70%", overflowY: "scroll" }}>
          {users.map((user, i) => (
            <Card className={"mt-2 " + (i > -1 && i < 3 ? "p-4" : "p-2")}>
              <LeaderboardEntry key={i} user={user} imgLink={i} />
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
