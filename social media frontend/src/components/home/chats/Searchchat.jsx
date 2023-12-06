import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom"; 

const Searchchat = () => {
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


  const handleClick=async(e)=>{


 if(e){
   try {
    await axios.post(`http://localhost:5001/createchat`,{senderId:userInfo.Id,receiverId:e},{
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
   } catch (error) {
    console.log(`${error}`);
   }
 }
  }

  return (
    <div>
      search to chat...
      <div>
        <form style={{ display: "flex" }}>
          {" "}
 {" "}
          <input
            type="text"
            placeholder="search"
            className="searchbar"
            value={firstname}
            onChange={(e) =>setFirstname(e.target.value)}
          />
          <button onClick={searched}> search</button>
        </form>

        {searchedResults.map((item, index) => (
          <>
            <div
              key={index}
              style={{
                border: "solid",
                borderRadius: "1rem",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <h6>{item.firstname}</h6>
              <img
                className="profileimage"
                src={`http://localhost:5001/image2/${item.profilePicture}`}
                alt="no prof img"
              />
   <button value={item._id} onClick={() => handleClick(item._id)}>chat</button>

            </div>
          </>
        ))}
        <div></div>
      </div>
    </div>
  );
};

export default Searchchat;
