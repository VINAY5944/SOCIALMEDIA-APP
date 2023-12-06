import React from "react";
import "./profileside.css";
import Search from "./Search";
import Profilecard from "./Profilecard";
import Followerscard from "./Followerscard";
const Profileside = () => {
  return (
    <div className="mainprofile">
      <Search />
      <Profilecard />
      <Followerscard />
    </div>
  );
};

export default Profileside;
