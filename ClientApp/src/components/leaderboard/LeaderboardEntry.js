import React from "react";

const medals = ["medal-gold.png", "medal-silver.png", "medal-bronze.png", null];

export default function LeaderboardEntry({ user, imgLink }) {
  return (
    <div className="d-flex justify-content-between me-3">
      <div className="d-flex gap-4 ms-3 align-items-center">
        {imgLink < 3 ? (
          <img src={medals[imgLink]} style={{ maxHeight: "30px" }} />
        ) : (
          <div className="ms-4">{imgLink + 1}.</div>
        )}
        <div>{user.Name}</div>
      </div>
      <div className={imgLink < 3 ? "" : "me-3"}>{user.Score}</div>
    </div>
  );
}
