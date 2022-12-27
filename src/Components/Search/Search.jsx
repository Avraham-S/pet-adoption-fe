import React, { useState } from "react";
import "./Search.css";
import searchImg from "../../resources/search_FILL0_wght400_GRAD0_opsz48.svg";

export const Search = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    console.log(query);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div id="search-form-container">
      <form action="" id="search-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" onChange={handleChange} />
        <button id="submit-search-button">
          {/* Search */}
          <img src={searchImg} />
        </button>
      </form>
      <div id="search-results"></div>
    </div>
  );
};
