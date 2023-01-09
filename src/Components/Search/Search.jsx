import React, { useState } from "react";
import "./Search.css";
import searchImg from "../../resources/search_FILL0_wght400_GRAD0_opsz48.svg";
import { PetCard } from "../PetCard/PetCard";
import axios from "axios";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [resuts, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (query.trim() === "") return;
    getPetsFromServer();
    console.log(query);
  };

  const getPetsFromServer = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/pets/${query}`);
      console.log(data);
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div id="search-form-container">
      <form action="" id="search-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" onChange={handleChange} />
        <button id="submit-search-button">
          <img src={searchImg} />
        </button>
      </form>
      <div id="search-results">
        {resuts.map((result) => {
          return (
            <PetCard
              name={result.name}
              id={result.petId}
              status={result.adoptionStatus}
            />
          );
        })}
      </div>
    </div>
  );
};
