import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import "./AddPetForm.css";
const PET_URL = process.env;
console.log(PET_URL);

export const AddPetForm = () => {
  const [petInfo, setPetInfo] = useState({});
  const [isLoggedIn] = useLoggedIn();
  const checkRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(petInfo);
    console.log(checkRef.current.checked);
  }, [petInfo]);

  useEffect(() => {
    if (!isLoggedIn) navigate("/home");
  });

  const handleChange = (e) => {
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
  };

  const uploadPet = async (data) => {
    try {
      const res = await axios.post(PET_URL, data);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadPet(petInfo);
  };

  return (
    <div id="add-pet-form-container">
      <form
        action=""
        onChange={handleChange}
        onSubmit={handleSubmit}
        id="add-pet-form"
      >
        <div className="input-container">
          Name
          <input type="text" name="name" />
        </div>
        <div className="input-container">
          Picture
          <input type="text" name="picture" />
        </div>
        <div className="input-container">
          Height
          <input type="text" name="height" />
        </div>
        <div className="input-container">
          Weight
          <input type="text" name="weight" />
        </div>
        <div className="input-container">
          Breed
          <input type="text" name="breed" />
        </div>
        <div className="input-container">
          Dietary Restrictions
          <input type="text" name="dietary" />
        </div>
        <div className="input-container">
          Bio
          <input type="text" name="bio" />
        </div>
        <div className="input-container">
          Hypoallergenic
          <input
            type="checkbox"
            name="hypoallergenic"
            ref={checkRef}
            value={checkRef.current?.checked ?? false}
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
};
/*
table.string("type");
    table.string("name");
    table.string("picture");
    table.integer("height");
    table.integer("weight");
    table.string("color");
    table.string("bio");
    table.boolean("hypoallergenic");
    table.string("dietary");
    table.string("breed");
*/
