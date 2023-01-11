import React from "react";
import "./MyPetsPage.css";
import axios from "axios";
import { PetCard } from "../PetCard/PetCard";
import { useState } from "react";
import { useEffect } from "react";

import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../Contexts/UserProvider";

const PET_URL = "http://localhost:8080/pets/";
console.log(PET_URL);
export const MyPetsPage = () => {
  const [petsList, setPetsList] = useState([]);
  const [isLoggedIn] = useLoggedIn();
  const [user] = useUser();
  const navigate = useNavigate();

  const getPetsList = async () => {
    console.log(user);
    const pets = await axios.get(PET_URL + `?ownerId=${user.id}`);
    console.log(pets);
    setPetsList(pets.data);
  };
  // ("http://localhost:8080/pets/648d6fbd-cc3f-4049-93c7-6320c1dcdad0");

  useEffect(() => {
    if (!isLoggedIn) navigate("/home");
  });
  useEffect(() => {
    getPetsList();
  }, []);

  return (
    <>
      {petsList.length ? (
        <div id="card-container">
          {petsList.map((pet) => (
            <PetCard
              name={pet.name}
              status={pet.adoptionStatus}
              key={pet.petId}
              id={pet.petId}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          No pets yet. <br /> Click <Link to="/search">here</Link> to find one
        </div>
      )}
    </>
  );
};
