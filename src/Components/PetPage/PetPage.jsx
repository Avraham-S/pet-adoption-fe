import React from "react";
import "./PetPage.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const PET_URL = process.env.REACT_APP_BASE_URL + "/pets";

export const PetPage = () => {
  const [pet, setPet] = useState();
  const id = new URLSearchParams(window.location.search).get("id");

  const getPetData = async () => {
    const res = await axios.get(PET_URL + id);
    setPet(res.data);
  };

  useEffect(() => {
    getPetData();
  }, []);

  if (!pet) return;
  return (
    <div id="pet-page-container">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmtG1aTa9RLWZjJiw7nct27KOB_RjHkSz0aWNKCpGv&s"
        alt=""
      />
      <div id="pet-details">
        <div className="pet-detail">
          Name: <span>{pet.name}</span>
        </div>
        <div className="pet-detail">
          Type: <span>{pet.type}</span>
        </div>
        <div className="pet-detail">
          Availabilty: <span>{pet.adoptionStatus}</span>
        </div>
        <div className="pet-detail">
          Height: <span>{pet.height}</span>
        </div>
        <div className="pet-detail">
          Weight: <span>{pet.weight}</span>
        </div>
        <div className="pet-detail">
          Color: <span>{pet.color}</span>
        </div>
        <div className="pet-detail">
          Bio: <span>{pet.bio}</span>
        </div>
        <div className="pet-detail">
          Hypoalergenic: <span>{pet.hypoalergenic ? "yes" : "no"}</span>
        </div>
        <div className="pet-detail">
          Dietary Restrictions: <span>{pet.dietary}</span>
        </div>
        <div className="pet-detail">
          Breed: <span>{pet.breed}</span>
        </div>
      </div>
    </div>
  );
};
