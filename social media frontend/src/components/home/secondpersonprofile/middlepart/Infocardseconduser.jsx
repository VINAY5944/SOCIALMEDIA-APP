import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Infocardseconduser = () => {
  const user = useParams();
  const userId = user.id;
  const [detail, setDetail] = useState([]);
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [buttonState, setButtonState] = useState(null);

  useEffect(() => {
    if (userId) {
      try {
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
            setFollowing(response.data.following.length);
            setButtonState(response.data.following.includes(userInfo.Id));
          });
      } catch (error) {
        console.log(
          `the error in the get details of the second user is${error}`
        );
      }
    } else {
      console.log(`the details of user with id ${userId} is not fetched`);
    }
  }, [buttonState]);

  const followhandler =async(e)=>{
    const userInfo =await  JSON.parse(localStorage.getItem("currentUserInfo"));
    const currentUserId=userInfo.Id
    e.preventDefault()

  
    try {
    await  axios.put(`http://localhost:5001/followuser/${userId}`,{currentUserId},{
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    setButtonState(!buttonState)
    } catch (error) {
      console.log(`${error}`);
    }
   
  };

  return (
    <div>
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
        <h4 className="nameheading">worksAt:{detail.worksAt}</h4>
        <h4 className="nameheading">{detail.bio}</h4>
        <div className="follow">
          <tr style={{ borderTop: "solid", gap: "1 rem" }}>
            {" "}
            <h4 className="nameheading"> followers: {followers} &nbsp;</h4>
          </tr>
          <tr style={{ borderLeft: "solid" }}>{"   "}</tr>
          <tr style={{ borderTop: "solid", marginLeft: "15 px", gap: "1 rem" }}>
            {" "}
            <h4 className="nameheading">&nbsp; following: {following} </h4>
          </tr>
        </div>

        <button
          onClick={followhandler}
          style={{ width: "15%", marginLeft: "42%" }}
        >
          {" "}
          {buttonState ? "unfollow" : "follow"}
        </button>
      </div>
    </div>
  );
};

export default Infocardseconduser;
