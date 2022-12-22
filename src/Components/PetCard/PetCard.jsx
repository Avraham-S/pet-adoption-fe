import React from "react";
import "./PetCard.css";
import { Link } from "react-router-dom";

export const PetCard = ({ name, status, id }) => {
  return (
    <div className="card">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmtG1aTa9RLWZjJiw7nct27KOB_RjHkSz0aWNKCpGv&s"
        alt=""
        style={{ width: "100%" }}
      />
      <div
        style={{
          backgroundColor: "lightgray",
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          minHeight: "30%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>{name}</div>
          <div>{status}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to={`/petPage/?id=${id}`} className="see-more-link">
            See more...
          </Link>
        </div>
      </div>
    </div>
  );
};
