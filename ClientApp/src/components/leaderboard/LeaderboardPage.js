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

const users = [
  { Name: "Nathan Stout", Score: 723 },
  { Name: "Adam Polak", Score: 111 },
  { Name: "Alex Tong", Score: 154 },
  { Name: "Josh Dascoli", Score: 534 },
  { Name: "Emma Carter", Score: 2871 },
  { Name: "Liam Johnson", Score: 650 },
  { Name: "Sophia Martinez", Score: 9234 },
  { Name: "Mason Lee", Score: 415 },
  { Name: "Isabella White", Score: 7890 },
  { Name: "Ethan Brown", Score: 1203 },
  { Name: "Olivia Harris", Score: 3562 },
  { Name: "James Wilson", Score: 982 },
  { Name: "Ava Clark", Score: 6048 },
  { Name: "Benjamin Lewis", Score: 431 },
  { Name: "Charlotte Walker", Score: 2997 },
  { Name: "Lucas Hall", Score: 8563 },
  { Name: "Amelia Allen", Score: 1104 },
  { Name: "Henry Young", Score: 7452 },
  { Name: "Mia King", Score: 382 },
  { Name: "Sebastian Scott", Score: 9275 }
];

function getRandomNumber(x, y) {
  return Math.floor(Math.random() * (y - x + 1)) + x;
}

for(let i = 0; i < 4; i++) {
  users[i].Score = getRandomNumber(535, 9999);
}

for(let i = 4; i < users.length; i++) {
  users[i].Score = getRandomNumber(0, 534);
}

users.sort((a, b) => b.Score - a.Score);

export function LeaderboardPageWrapper() {
  const { address } = useParams();

  return <LeaderboardPage address={address} />;
}

export class LeaderboardPage extends Component {
  render() {
    const { address } = this.props;
    return (
      <div className="bg-grey" style={{ height: "94vh" }}>
        <NavHeader />
        <h1 className="text-center mt-2">{address}</h1>
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
