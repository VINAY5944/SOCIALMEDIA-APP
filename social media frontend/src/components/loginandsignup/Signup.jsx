import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [detail, setDetail] = useState([]);

  const nav = useNavigate();

  const formsubmitted = async (e) => {
    e.preventDefault();

    const siginInfo = await axios
      .post(`http://localhost:5001/`, {
        username,
        password,
        firstname,
        lastname,
      })
      .then((response) => {
        setDetail(response.data);
        localStorage.setItem("currentUserInfo", JSON.stringify(response.data));
      });

    if (detail) {
      nav("/");
    } else {
      alert("wrong credentials");
    }
  };

  return (
    <div className="main">
      <div className="formdiv">
        <form onSubmit={formsubmitted}>
     <h1> sign-up</h1>    
          <div>
            <label>
           
              <input
                value={username}
                placeholder="email"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                type="email"
              ></input>
            </label>
          </div>
          <div>
            <label>
            
              <input
                value={password}
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
              ></input>
            </label>
          </div>
          <div>
            <label>
            
              <input
                value={firstname}
                placeholder="firstname"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                type="text"
              ></input>
            </label>
          </div>
          <div>
            <label>
        
              <input
                value={lastname}
                placeholder="lastname"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
              ></input>
            </label>
          </div>
          <button type="submit">sign up</button>
          <p>Already have an account  <Link to="/" >log-in</Link>  instead?</p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
