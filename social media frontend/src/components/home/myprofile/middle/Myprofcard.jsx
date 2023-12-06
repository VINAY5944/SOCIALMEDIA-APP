import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Myprofcard = () => {
  const user = useParams();
  const userId = user.id;
  const [detail, setDetail] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
    axios
      .get(`http://localhost:5001/searchuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((response) => {
        setDetail(response.data);
        setFollowers(response.data.followers.length);
        setFollowing(response.data.followers.length);
      });
  }, []);

  console.log(detail);
  return (
    <div
      className="profilecard"
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <div classname="profileimgdiv">
        <img
          alt="profileimg"
          className="profimage"
          src={`http://localhost:5001/image2/${detail.profilePicture}`}
        />
        <img
          className="coverimage"
          alt="coverimg"
          src={`http://localhost:5001/image2/${detail.coverPicture}`}
        />
      </div>
      <h3 className="nameheading">{detail.firstname}</h3>
      <h4 className="nameheading">{detail.about}</h4>
      <h4 className="nameheading">{detail.livesIn}</h4>

      <div className="follow">
        <tr style={{ borderTop: "solid", gap: "1 rem" }}>
          {" "}
          <h4 className="nameheading">following:{following} &nbsp; </h4>
        </tr>
        <tr style={{ borderLeft: "solid" }}>{"   "}</tr>
        <tr style={{ borderTop: "solid", marginLeft: "15 px", gap: "1 rem" }}>
          {" "}
          <h4 className="nameheading"> &nbsp; followers:{followers}</h4>
        </tr>
      </div>
    </div>
  );
};

export default Myprofcard;
