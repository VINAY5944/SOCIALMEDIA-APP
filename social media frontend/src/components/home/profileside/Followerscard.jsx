import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./followerscard.css";
const Followerscard = () => {
  const usr = useParams();
  const userId = usr.id;

  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
    try {
      axios
        .get(`http://localhost:5001/getallexcept/${userInfo.Id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((response) => {
          setAllUser(response.data);
        });
    } catch (error) {}
  }, []);

  return (
    <div className="followermaindiv">
      <h3>people you may know</h3>

      {allUser.map((item, index) => (
        <div key={index} className="flwcard">
          <img
            className="profileimg"
            alt="flwer1"
            src={`http://localhost:5001/image2/${item.profilePicture}`}
          ></img>{" "}
          <h3>{item.firstname}</h3>
          <Link to={`/secondpersonprofile/${item._id}`}>
            {" "}
            <button>view profile</button>{" "}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Followerscard;
