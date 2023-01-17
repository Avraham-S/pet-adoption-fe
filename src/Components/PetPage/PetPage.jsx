import React from "react";
import "./PetPage.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../../Contexts/UserProvider";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import { useNavigate } from "react-router-dom";
const PET_URL = "http://localhost:8080/pets/";
export const PetPage = () => {
  const [pet, setPet] = useState();
  const [user] = useUser();
  const [isLoggedIn, setIsLoggedIn] = useLoggedIn();
  const [isUsersPet, setIsUsersPet] = useState(false);
  const navigate = useNavigate();
  const id = new URLSearchParams(window.location.search).get("id");

  const getPetData = async () => {
    const { data } = await axios.get(PET_URL + id);
    console.log(data);
    setPet(data[0]);
    console.log(pet);
  };

  const renderButtons = () => {
    if (pet.adoptionStatus === "available")
      return (
        <>
          <button value="adopt" onClick={handleAdoptPet}>
            Adopt
          </button>
          <button value="foster" onClick={handleAdoptPet}>
            Foster
          </button>
        </>
      );
    if (!isUsersPet) return null;
    if (pet.adoptionStatus === "fostered")
      return (
        <>
          <button value="adopt" onClick={handleAdoptPet}>
            Adopt
          </button>
          <button value="return" onClick={handleAdoptPet}>
            Return
          </button>
        </>
      );

    if (pet.adoptionStatus === "adopted")
      return (
        <button value="return" onClick={handleAdoptPet}>
          Return
        </button>
      );
  };

  const renderEditButton = () => {
    if (user.isAdmin) {
      return (
        <button
          onClick={() => {
            navigate(`/editPet/?id=${pet.petId}`);
          }}
        >
          Edit
        </button>
      );
    }
  };

  // useEffect(() => {
  //   console.log(isUsersPet);
  //   if (!isLoggedIn) navigate("/home");
  // });

  useEffect(() => {
    getPetData();
  }, []);

  useEffect(() => {
    if (pet) setIsUsersPet(pet.ownerId === user.id);
    console.log(isUsersPet);
  }, [pet]);

  const requestAdoption = async (type) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const headersConfig = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post(
        PET_URL + "adopt",
        {
          type,
          ownerId: user.id,
          petId: pet.petId,
        },
        headersConfig
      );
      const [updatedPet] = data;
      setPet(updatedPet);
    } catch (error) {
      if (error.response.status === 401) setIsLoggedIn(false);
      console.error(error);
    }
  };

  const handleAdoptPet = (e) => {
    const type = e.target.value;
    requestAdoption(type);
  };

  if (!pet) return;
  return (
    <div id="pet-page-container">
      <img
        src={pet.picture}
        alt=""
        style={{ height: "10rem", width: "20rem", borderColor: "white" }}
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
      {isLoggedIn && (
        <div>
          {renderButtons()}
          {renderEditButton()}
        </div>
      )}
    </div>
  );
};
