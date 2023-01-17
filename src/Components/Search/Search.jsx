import React, { useState } from "react";
import "./Search.css";
import searchImg from "../../resources/search_FILL0_wght400_GRAD0_opsz48.svg";
import { PetCard } from "../PetCard/PetCard";
import { useUser } from "../../Contexts/UserProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoggedIn } from "../../Contexts/LoggedInProvider";
import { useEffect } from "react";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [types, setTypes] = useState([]);
  const [user] = useUser();
  const [isLoggedIn] = useLoggedIn();
  const navigate = useNavigate();

  const clearEntries = () => {
    const objArray = Object.entries(query).filter(
      (entry) => entry[0] === "type"
    );

    setQuery(Object.fromEntries(objArray));
  };

  useEffect(() => {
    getTypes();
  }, []);
  useEffect(() => {
    if (!advancedSearch) clearEntries();
  }, [advancedSearch]);

  const getTypes = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_BASE_URL + "pets/types"
      );

      setTypes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPetsFromServer();
  };

  const getPetsFromServer = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}pets/${
          user ? `?id=${user.id}` : ""
        }${`&queries=${JSON.stringify(query)}`}`
      );
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };
  const removePropertyFromQuery = (prop) => {
    const obj = { ...query };
    delete obj[prop];
    return obj;
  };
  const handleChange = (e) => {
    if (e.target.value === "") {
      const deleted = removePropertyFromQuery(e.target.name);
      setQuery(deleted);
    } else setQuery({ ...query, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={
        advancedSearch
          ? { display: "flex", justifyContent: "space-evenly" }
          : { display: "flex", flexDirection: "column" }
      }
      id="full-search-container"
    >
      <div id="search-form-container">
        <div
          style={{ display: "flex", justifyContent: "center" }}
          onChange={() => setAdvancedSearch(!advancedSearch)}
        >
          Advanced Search
          <input type="checkbox" />
        </div>
        <form
          action=""
          id="search-form"
          onSubmit={handleSubmit}
          style={
            advancedSearch
              ? {
                  flexDirection: "column",
                  gap: "1rem",
                  backgroundColor: "rgb(181, 203, 221)",
                  border: "3px solid rgb(113, 137, 255)",
                  borderRadius: " 5px",
                  padding: "1rem",
                }
              : {}
          }
          onChange={handleChange}
        >
          {advancedSearch && (
            <>
              <div>
                Adoption Status:{" "}
                <select
                  id="status-selection"
                  className="pet-search-select"
                  name="adoptionStatus"
                >
                  <option value="available">Available</option>
                  <option value="fostered">Fostered</option>
                  <option value="adopted">Adopted</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="number"
                  name="height"
                  placeholder="Max-Height"
                  min="0"
                />
                <input
                  type="number"
                  name="weight"
                  placeholder="Max-Weight"
                  min="0"
                />
              </div>
              <input type="text" name="name" placeholder="Name" />
            </>
          )}
          <>
            <>
              {advancedSearch && "Type:"}
              <select
                id="type-selection"
                className="pet-search-select"
                name="type"
              >
                <option value="any" default>
                  All
                </option>
                {types.map(({ type }, i) => {
                  return (
                    <option value={type} key={i}>
                      {type}
                    </option>
                  );
                })}
              </select>
              <button
                id="submit-search-button"
                style={
                  advancedSearch
                    ? { borderLeft: "1px solid gray", borderRadius: "5px" }
                    : {}
                }
              >
                <img src={searchImg} />
              </button>
            </>{" "}
          </>
        </form>
      </div>
      {results.length && (
        <div
          id="search-results-container"
          style={advancedSearch ? {} : { height: "35rem" }}
        >
          <div
            id="search-results"
            style={
              advancedSearch
                ? {}
                : { gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }
            }
          >
            {results?.map((result) => {
              return (
                <PetCard
                  name={result.name}
                  id={result.petId}
                  status={result.adoptionStatus}
                  key={crypto.randomUUID()}
                  savedId={result.userId}
                  image={result.picture}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
