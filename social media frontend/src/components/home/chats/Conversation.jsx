import axios from "axios";
import React, { useEffect, useState } from "react";

const Conversation = ({ data, currentUserId }) => {
  const [userData, setUserData] = useState([]);

  console.log(currentUserId);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
    const userId = data.members.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `http://localhost:5001/searchuser/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

          setUserData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [data.members, currentUserId]);

  console.log(userData);

  return (
    <div>
      <div className="followerconv">
        <div className="">
          <div className="onlinedot">
            <img
              src={`http://localhost:5001/image2/${userData.profilePicture}`}
              alt="no profimg"
              style={{ width: "50px", height: "50px" }}
            />
            <span>
              {userData.firstname} {userData.lastname}
            </span>

            <div>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
