import React from "react";

const Leaderboard = ({ size = 45 }) => (
    <img
        width={size}
        height={size}
        alt="Leaderboard"
        src="podium.png"
    />
);

export default Leaderboard;