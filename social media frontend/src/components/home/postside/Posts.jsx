import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "./posts.css";
import { useParams } from "react-router-dom";
import {format}from 'timeago.js'
const Posts = () => {
  const user = useParams();
  const userId = user.id;
  const [detail, setDetail] = useState([]);
  const [token, setToken] = useState("");
  const [timeline, setTimeline] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [name,setName]=useState([])
  const userInf = JSON.parse(localStorage.getItem("currentUserInfo"));

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
    setToken(userInfo.token);
    setDetail(userInfo);

    axios
      .get(`http://localhost:5001/timelinepost/${userInfo.Id}`,{
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((response) => {
        setTimeline(response.data);
        response.data.forEach((post)=>{

          const userInfo =  JSON.parse(localStorage.getItem("currentUserInfo"));
           axios.get(`http://localhost:5001/searchuser/${post.userId}`,{
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }).then((userResponse)=>{
              setName((name) => [...name, userResponse.data])
            })
        })



      });
  }, [liked]);

  const handleLike = async (e) => {
    //  e.preventDefault()
console.log(e);
    await axios
      .put(
        `http://localhost:5001/likepost/${e}`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const likesArray = [response.data.likes];
        setLiked(likesArray.includes(response.data.userId));

        setLikes(likesArray.length);

        console.log(likesArray.length);

      });

    setLiked(!liked);

  };
      
//   const handleChange= async(e)=>{
//      const userInfo =  JSON.parse(localStorage.getItem("currentUserInfo"));
//      await  axios.get(`http://localhost:5001/searchuser/${e}`,{
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       }).then((response)=>{
//         setName(response.data)
//       })
//       console.log(name);
// }
  
 console.log(name); 
  

  return (
    <div>
      {timeline.map((item, index) => {
        // Find the corresponding user object in the names array
        const userObject = name.find((user) => user._id === item.userId);

        return (
          <div className="postcards" key={index}>
            {/* Render user name */}
            {userObject ? userObject.firstname : 'your post'}

            <img
              className="postimage"
              src={`http://localhost:5001/image1/${item.image}`}
              alt="image not available"
            />

            <h6 key={index}>{item.desc}</h6>

            <div>
              <p>Likes: {item.likes.length}</p>
              <button onClick={() => handleLike(item._id)}>
                {item.likes.includes(userInf.Id) ? "unlike" : "like"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
