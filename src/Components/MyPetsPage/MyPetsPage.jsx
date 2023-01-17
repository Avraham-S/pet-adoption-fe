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

export const MyPetsPage = () => {
  const [petsList, setPetsList] = useState([]);
  const [showSavedPets, setShowSavedPets] = useState(false);
  const [isLoggedIn] = useLoggedIn();
  const [user] = useUser();
  const navigate = useNavigate();

  const getPetsList = async () => {
    console.log(user);
    const pets = showSavedPets
      ? await axios.get(PET_URL + `save/${user.id}`)
      : await axios.get(PET_URL + `user/${user.id}`);
    console.log(pets);
    if (showSavedPets) {
      const filtered = pets.data.filter((pet) => {
        console.log(pet.userId, user.id);
        return pet.userId === user.id;
      });
      console.log(filtered);
      setPetsList(filtered);
    } else setPetsList(pets.data);
  };
  // ("http://localhost:8080/pets/648d6fbd-cc3f-4049-93c7-6320c1dcdad0");

  useEffect(() => {
    if (!isLoggedIn) navigate("/home");
  });

  useEffect(() => {
    getPetsList();
  }, [showSavedPets]);
  useEffect(() => {
    getPetsList();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          margin: "1rem",
        }}
      >
        <span
          className={`pets-option ${!showSavedPets && "active-list"}`}
          onClick={() => setShowSavedPets(false)}
        >
          My Pets
        </span>
        <span
          className={`pets-option ${showSavedPets && "active-list"}`}
          onClick={() => setShowSavedPets(true)}
        >
          Saved Pets
        </span>
      </div>
      {petsList.length ? (
        <div id="card-container">
          {petsList.map((pet, i) => (
            <PetCard
              name={pet.name}
              status={pet.adoptionStatus}
              key={crypto.randomUUID()}
              id={pet.petId}
              savedId={pet.userId}
              image={pet.picture}
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
