import React, { useState } from "react";
import "./login.css";
import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [detail, setDetail] = useState([]);
  const nav = useNavigate();

  const formsubmitted = async (e) => {
    e.preventDefault();
    const userInfo = await axios
      .post("http://localhost:5001/login", { username, password })
      .then((response) => {
        setDetail(response.data);
        localStorage.setItem("currentUserInfo", JSON.stringify(response.data));

        const Id = response.data.Id;

        if (Id) {
          nav(`/home/${Id}`);
        } else {
          alert("wrong credentials");
        }
      });
  };

  return (
    <>
      <div className="main">
        <h1>login</h1>
        <div className="formdiv">
          <form onSubmit={formsubmitted}>
            <div>
              <label>
                <input
                  placeholder="enter your email"
                  value={username}
                  type="email"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                ></input>
              </label>
            </div>

            <div>
              <label>
                <input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
              </label>
            </div>
            <div>
              <button type="submit">login</button>

              <p>
                Don't have an account <Link to="/signup">sign in</Link> instead?
              </p>
            </div>
          </form>
        </div>
      </div>{" "}
    </>
  );
}

export default Login;
