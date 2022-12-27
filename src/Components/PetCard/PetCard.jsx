import React, { useState } from "react";
import "./PetCard.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const PetCard = ({ name, status, id }) => {
  const [url, setUrl] = useState("");

  const getImgUrl = async () => {
    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    const url = data.message;
    setUrl(url);
  };

  useEffect(() => {
    getImgUrl();
  }, []);

  return (
    <div
      className="card"
      style={{
        // backgroundImage:
        //   "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmtG1aTa9RLWZjJiw7nct27KOB_RjHkSz0aWNKCpGv&s)",

        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="pet-info">
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
