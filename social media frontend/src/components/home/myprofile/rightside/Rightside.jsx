import React from "react";
import "./rightside.css";
import { useNavigate } from "react-router-dom";
function Rightside() {
  const nav = useNavigate();
  const logout = (e) => {
    e.preventDefault();

    localStorage.clear();
    nav("/");
  };

  return (
    <div>
      <button
        onClick={logout}
        style={{ backgroundColor: "red", marginTop: "5%", marginLeft: "35%" }}
      >
        logout
      </button>
    </div>
  );
}

export default Rightside;
