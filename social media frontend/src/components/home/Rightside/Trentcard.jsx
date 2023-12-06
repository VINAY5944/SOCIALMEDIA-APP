import React from "react";
import "./trentcard.css";
import { useNavigate, useParams } from "react-router-dom";
const Trentcard = () => {
  const params = useParams();
  const nav = useNavigate();

  const clicked = async () => {
    nav(`/myprofile/${params.id}`);
  };

  const logout = async () => {
    localStorage.clear();
    nav("/");
  };
  const chats = async () => {
    nav("/chat");
  };
  return (
    <div className="maintrend">
      <button onClick={clicked} style={{ marginTop: "10px" }}>
        my profile
      </button>
      <button
        onClick={logout}
        style={{ backgroundColor: "red", marginTop: "10px" }}
      >
        logout
      </button>
      <button onClick={chats} style={{ marginTop: "10px" }}>
        chat
      </button>
    </div>
  );
};

export default Trentcard;
