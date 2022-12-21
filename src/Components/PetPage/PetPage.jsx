import React from "react";
import "./PetPage.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const PET_URL = "http://localhost:8080/pets/";

export const PetPage = () => {
  const [pet, setPet] = useState();
  const id = new URLSearchParams(window.location.search).get("id");

  const getPetData = async () => {
    const res = await axios.get(PET_URL + id);
    console.log(res);
    setPet(res.data);
  };

  useEffect(() => {
    getPetData();
    console.log(pet);
  }, []);

  if (!pet) return;
  return (
    <div>
      <img src="" alt="" />
      <div>Name: {pet.name}</div>
      <div>Type: {pet.type}</div>
      <div>Availabilty: {pet.adoptionStatus}</div>
      <div>Height: {pet.height}</div>
      <div>Weight: {pet.weight}</div>
      <div>Color: {pet.color}</div>
      <div>Bio: {pet.bio}</div>
      <div>Hypoalergenic: {pet.hypoalergenic ? "yes" : "no"}</div>
      <div>Dietary Restrictions: {pet.dietary}</div>
      <div>Breed: {pet.breed}</div>
    </div>
  );
};
