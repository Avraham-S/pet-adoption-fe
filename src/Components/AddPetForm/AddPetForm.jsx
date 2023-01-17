import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import { uploadPhoto } from "../../resources/helpers";
import "./AddPetForm.css";

const PET_URL = process.env.REACT_APP_BASE_URL;

export const AddPetForm = (props) => {
  console.log(process.env.REACT_APP_BASE_URL);
  const [petInfo, setPetInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useLoggedIn();
  const [defaultInfo, setDefaultInfo] = useState({});
  const checkRef = useRef();
  const bioRef = useRef();
  const navigate = useNavigate();
  const imageInputRef = useRef();
  const fileNameRef = useRef();
  const formRef = useRef();
  const id = new URLSearchParams(window.location.search).get("id");

  const getPetInfo = async () => {
    try {
      if (!id) return;
      const { data } = await axios.get(PET_URL + "/" + id);
      const [pet] = data;
      setDefaultInfo(pet);
      setPetInfo(pet);
      formRef.current.reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/home");
  });
  useEffect(() => {
    getPetInfo();
  }, []);

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
      return;
    }
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
  };

  const uploadPet = async (data) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const headersConfig = { headers: { Authorization: `Bearer ${token}` } };

      if (props.isEdit) {
        const res = await axios.put(PET_URL + `/${id}`, data, headersConfig);
        getPetInfo();
      } else {
        const res = await axios.post(PET_URL, data, headersConfig);
      }
    } catch (err) {
      if (err.response.status === 401) setIsLoggedIn(false);
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
    if (imageInputRef.current.files.length !== 0) {
      await handleImage(imageInputRef.current.files[0]);
    }
    await uploadPet(petInfo);
    formRef.current.reset();
  };

  return (
    <div id="add-pet-form-container">
      <h1 className="header">{props.isEdit ? "Edit" : "Add"} Pet</h1>
      <form
        action=""
        onChange={(e) => {
          handleChange(e);
          handleHeight();
        }}
        onSubmit={handleSubmit}
        id="add-pet-form"
        ref={formRef}
      >
        <div className="input-container">
          Type
          <input
            type="text"
            name="type"
            defaultValue={props.isEdit ? defaultInfo.type : ""}
          />
        </div>
        <div className="input-container">
          Name
          <input
            type="text"
            name="name"
            defaultValue={props.isEdit ? defaultInfo.name : ""}
          />
        </div>
        <div className="input-container">
          Height
          <input
            type="text"
            name="height"
            defaultValue={props.isEdit ? defaultInfo.height : ""}
          />
        </div>
        <div className="input-container">
          Weight
          <input
            type="text"
            name="weight"
            defaultValue={props.isEdit ? defaultInfo.weight : ""}
          />
        </div>
        <div className="input-container">
          Breed
          <input
            type="text"
            name="breed"
            defaultValue={props.isEdit ? defaultInfo.breed : ""}
          />
        </div>
        <div className="input-container">
          Color
          <input
            type="text"
            name="color"
            defaultValue={props.isEdit ? defaultInfo.color : ""}
          />
        </div>
        <div className="input-container">
          Dietary Restrictions
          <input
            type="text"
            name="dietary"
            defaultValue={props.isEdit ? defaultInfo.dietary : ""}
          />
        </div>
        <div className="input-container">
          Bio
          <textarea
            type="text"
            name="bio"
            ref={bioRef}
            defaultValue={props.isEdit ? defaultInfo.bio : ""}
          />
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
            defaultValue={props.isEdit ? defaultInfo.hypoallergenic : ""}
          />
        </div>
        <div className="input-container">
          Picture
          <span ref={fileNameRef}></span>
          <input
            type="file"
            name="picture"
            ref={imageInputRef}
            onChange={(e) => {
              if (e.target.files[0])
                fileNameRef.current.textContent = e.target.files[0].name;
            }}
            hidden
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
        <button>{props.isEdit ? "Update" : "Upload"} Pet</button>
      </form>
    </div>
  );
};
