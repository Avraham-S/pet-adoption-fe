import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import { uploadPhoto } from "../../resources/helpers";
import "./AddPetForm.css";

const PET_URL = "http://localhost:8080/pets";

export const AddPetForm = () => {
  const [petInfo, setPetInfo] = useState({});
  const [isLoggedIn] = useLoggedIn();
  const checkRef = useRef();
  const bioRef = useRef();
  const navigate = useNavigate();
  const imageInputRef = useRef();
  const fileNameRef = useRef();

  useEffect(() => {
    if (!isLoggedIn) navigate("/home");
    console.log(petInfo);
  });

  const handleImage = async (file) => {
    try {
      const downloadUrl = await uploadPhoto(file);
      setPetInfo({ ...petInfo, picture: downloadUrl });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "picture") {
      // handleImage(e.target.files[0]);
      return;
    }
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
  };

  const uploadPet = async (data) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const headersConfig = { headers: { Authorization: `Bearer ${token}` } };
      console.log(headersConfig);
      const res = await axios.post(PET_URL, data, headersConfig);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  function handleHeight() {
    const ta = bioRef.current;
    ta.style.height = `auto`;
    ta.style.height = `${ta.scrollHeight}px`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    petInfo.hypoallergenic = !!petInfo.hypoallergenic;
    petInfo.height = Number(petInfo.height);
    petInfo.weight = Number(petInfo.weight);
    await handleImage(imageInputRef.current.files[0]);

    uploadPet(petInfo);
  };

  return (
    <div id="add-pet-form-container">
      <h1 className="header">Add Pet</h1>
      <form
        action=""
        onChange={(e) => {
          handleChange(e);
          handleHeight();
        }}
        onSubmit={handleSubmit}
        id="add-pet-form"
      >
        <div className="input-container">
          Type
          <input type="text" name="type" />
        </div>
        <div className="input-container">
          Name
          <input type="text" name="name" />
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
          Color
          <input type="text" name="color" />
        </div>
        <div className="input-container">
          Dietary Restrictions
          <input type="text" name="dietary" />
        </div>
        <div className="input-container">
          Bio
          <textarea type="text" name="bio" ref={bioRef} />
        </div>
        <div
          className="input-container"
          style={{ flexDirection: "row", alignItems: "center", gap: "1rem" }}
        >
          Hypoallergenic
          <input
            type="checkbox"
            name="hypoallergenic"
            ref={checkRef}
            value={checkRef.current?.checked ?? false}
          />
        </div>
        <div className="input-container">
          Picture
          <span ref={fileNameRef}></span>
          <input
            type="file"
            name="picture"
            ref={imageInputRef}
            hidden
            onChange={(e) => {
              if (e.target.files[0])
                fileNameRef.current.textContent = e.target.files[0].name;
            }}
          />
          <button
            type="button"
            onClick={(e) => {
              imageInputRef.current.click();
            }}
          >
            Choose File
          </button>
        </div>
        <button>Upload Pet</button>
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
