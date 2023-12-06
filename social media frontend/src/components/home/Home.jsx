import React from "react";
import "./home.css";
import Profileside from "./profileside/Profileside";
import Postside from "./postside/Postside";
import Rightside from "./Rightside/Rightside";
const Home = () => {
  return (
    <div className="homemain">
      <Profileside />
      <Postside />
      <Rightside />
    </div>
  );
};

export default Home;
