import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";

const Myposts = () => {
  const [myposts, setMyposts] = useState([]);
  const [token, setToken] = useState("");

  useLayoutEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
    setToken(userInfo.token);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
        const userId = userInfo.Id;
        const response = await axios.post(
          "http://localhost:5001/allpost",
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMyposts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (token) {
      fetchData();
    } else {
      console.log("no token available");
    }
  }, [token]);

  const deletepost = async (e) => {
    e.preventDefault();
    try {
      const userInfo = await JSON.parse(
        localStorage.getItem("currentUserInfo")
      );
      const userId = userInfo.Id;
      const tkn = userInfo.token;
      if (tkn) {
        const del = await axios.delete(
          `http://localhost:5001/deletepost/${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${tkn}`,
            },
            data: {
              userId: userId,
            },
          }
        );
      } else {
        console.log("no token");
      }
    } catch (error) {
      console.log(`the error in my delete post ${error}`);
    }
  };

  return (
    <div>
      {myposts.map((item, index) => (
        <>
          <div className="postcards">
            <img
              className="postimage"
              src={`http://localhost:5001/image1/${item.image}`}
              alt="image not available"
            />

            <h1 key={index}>{item.desc}</h1>
            <div>
              <h6>likes:{item.likes.length}</h6>
              <button value={item._id} onClick={(e) => deletepost(e)}>
                delete
              </button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Myposts;
