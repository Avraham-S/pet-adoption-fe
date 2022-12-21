import React from "react";
import "./PetCard.css";
import { Link } from "react-router-dom";

export const PetCard = ({ name, status, id }) => {
  return (
    <div>
      <img src="" alt="" />
      <div>{name}</div>
      <div>{status}</div>
      <Link to={`/petPage/?id=${id}`}>See more</Link>
    </div>
  );
};
