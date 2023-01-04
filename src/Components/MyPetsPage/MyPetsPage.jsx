import React from "react";
import "./MyPetsPage.css";
import axios from "axios";
import { PetCard } from "../PetCard/PetCard";
import { useState } from "react";
import { useEffect } from "react";

import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import { useNavigate } from "react-router-dom";

const PET_URL = "http://localhost:8080/pets";
console.log(PET_URL);
export const MyPetsPage = () => {
  const [petsList, setPetsList] = useState([]);
  const [isLoggedIn] = useLoggedIn();
  const navigate = useNavigate();

  const getPetsList = async () => {
    const pets = await axios.get(PET_URL);
    setPetsList(pets.data);
  };
  useEffect(() => {
    if (!isLoggedIn) navigate("/home");
  });
  useEffect(() => {
    getPetsList();
  }, []);

  return (
    <div id="card-container">
      {petsList.slice(0, 15).map((pet) => (
        <PetCard
          name={pet.name}
          status={pet.adoptionStatus}
          key={pet.id}
          id={pet.id}
        />
      ))}
    </div>
  );
};
