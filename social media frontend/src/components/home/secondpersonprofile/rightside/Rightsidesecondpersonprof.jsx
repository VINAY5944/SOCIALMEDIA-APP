import React from "react";
import { useNavigate } from "react-router-dom";

const Rightsidesecondpersonprof = () => {
  const nav = useNavigate();

  const clicked = async () => {
    const userinfo = await JSON.parse(localStorage.getItem("currentUserInfo"));

    await nav(`/home/${userinfo.Id}`);
  };

  const logout = async () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div>
      <button onClick={clicked} style={{ marginRight: "5%", marginTop: "5%" }}>
        my profile
      </button>
      <button
        onClick={logout}
        style={{ backgroundColor: "red", marginTop: "5%" }}
      >
        logout
      </button>
    </div>
  );
};

export default Rightsidesecondpersonprof;
