import React from "react";
import "./myprofile.css";
import Leftside from "./leftside/Leftside";
import Rightside from "./rightside/Rightside";
import Middle from "./middle/Middle";
const Myprofile = () => {
  return (
    <div className="profilemain">
      <Leftside />
      <Middle />
      <Rightside />
    </div>
  );
};

export default Myprofile;
