import React, { useState } from "react";
import "./PetCard.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../../Contexts/UserProvider";
import { useEffect } from "react";
import defaultImage from "../../resources/default_pet.jpg";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";

export const PetCard = ({ name, status, id, savedId, image }) => {
  const [url, setUrl] = useState("");
  const [isLoggedIn] = useLoggedIn();
  const [user] = useUser();
  const [saved, setSaved] = useState(false);
  // console.log(id);
  const getImgUrl = async () => {
    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    const url = data.message;
    setUrl(url);
  };

  const savePet = async (petId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const headersConfig = { headers: { Authorization: `Bearer ${token}` } };
      const data = await axios.post(
        `http://localhost:8080/pets/save/${user.id}/${petId}`,
        {},
        headersConfig
      );

      setSaved(true);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const unsavePet = async (petId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const headersConfig = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.delete(
        `http://localhost:8080/pets/save/${user.id}/${petId}`,
        headersConfig
      );
      setSaved(false);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSaved(user.id === savedId);
    // console.log(id);
    getImgUrl();
  }, []);

  useEffect(() => {
    // console.log(savedId);
    console.log(saved);
    // console.log(id);
  }, [saved]);

  return (
    <div
      className="card"
      style={{
        // backgroundImage:
        //   "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmtG1aTa9RLWZjJiw7nct27KOB_RjHkSz0aWNKCpGv&s)",

        backgroundImage: `url(${image ? image : defaultImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="pet-info">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              backgroundColor: "lightgray",
              borderRadius: "10px",
              width: "fit-content",
              padding: "3px",
              boxShadow: "0 0 5px",
              fontSize: "1.3em",
            }}
          >
            {name}
          </div>
          {isLoggedIn && (
            <div
              style={{
                backgroundColor: "lightgray",
                borderRadius: "50%",
                width: "1.5rem",
                height: "1.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 0 5px",
              }}
            >
              <span
                className={saved ? " saved" : "" + "save-button"}
                onClick={(e) => {
                  saved
                    ? unsavePet(e.target.dataset.id)
                    : savePet(e.target.dataset.id);
                }}
                data-id={id}
              >
                {saved ? "♥︎" : "♡"}
              </span>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              backgroundColor: "lightgrey",
              boxShadow: "0 0 5px",
              borderRadius: "10px",
            }}
          >
            <div>{status}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
              to={`/petPage/?id=${id}`}
              className="see-more-link"
              style={{
                backgroundColor: "lightgray",
                borderRadius: "10px",
                padding: "3px",
                boxShadow: "0 0 5px black",
              }}
            >
              See more...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
