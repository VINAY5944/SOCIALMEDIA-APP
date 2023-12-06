import axios from "axios";
import React, { useEffect, useState } from "react";
import "./search.css";
import { logDOM } from "@testing-library/react";
import { Link } from "react-router-dom";
import logo from '../logoimg/socialmedia logo.png'
const Search = () => {
  const [firstname, setFirstname] = useState("");

  const [searchedResults, setSearchedResults] = useState([]);

  console.log(firstname);

  const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
  const userId = userInfo.Id;
  console.log(userId);
  const searched = async (e) => {
    e.preventDefault();
    // Use optional chaining to avoid errors if userInfo is undefined
    try {
      const userInfoString = localStorage.getItem("currentUserInfo");

      if (!userInfoString) {
        console.error("User information not found in localStorage");
        return;
      }
    } catch (error) {
      console.log(`the error is${error}`);
    }
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5001/searchuserbyname?search=${firstname}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setSearchedResults(response.data);
    } catch (error) {
      console.log(`The error in the search component is ${error}`);
    }
  };

  return (
    <div>
      <form style={{ display: "flex" }}>
        {" "}
        <img  style={{height:"50px",width:'50px',borderRadius:'1rem'}}  src={logo} alt="logo" />{" "}
        <input
          type="text"
          placeholder="search"
          className="searchbar"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <button onClick={searched}> search</button>
      </form>

      {searchedResults.map((item, index) => (
        <>
          <Link to={`/secondpersonprofile/${item._id}`}>
            <div key={index}>
              <h6>{item.firstname}</h6>
              <img
                className="profileimage"
                src={`http://localhost:5001/image2/${item.profilePicture}`}
                alt="no prof img"
              ></img>
            </div>
          </Link>
        </>
      ))}
      <div></div>
    </div>
  );
};

export default Search;
