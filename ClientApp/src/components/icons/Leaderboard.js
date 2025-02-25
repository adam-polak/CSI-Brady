import React from "react";

const Leaderboard = ({ size = 38, color = "#000000" }) => (
    <svg
        viewBox="0 0 76 76"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        fill={color}
        width={size}
        height={size}
    >
        <g id="SVGRepo_iconCarrier">
            <path
                fill={color}
                fillOpacity="1"
                strokeWidth="0.2"
                strokeLinejoin="round"
                d="M 31,19L 45,19L 45,38L 57,38L 57,57L 19,57L 19,32L 31,32L 31,19"
            />
        </g>
    </svg>
);

export default Leaderboard;