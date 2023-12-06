import React from "react";
import Sharepost from "./Sharepost";
import Posts from "./Posts";

function Postside() {
  return (
    <div>
      <Sharepost />
      <div style={{ marginTop: "150px" }}>{""}</div>
      <Posts />
    </div>
  );
}

export default Postside;
