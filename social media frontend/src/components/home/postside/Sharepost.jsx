import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./sharepost.css";
import axios from "axios";
const Sharepost = () => {
  const [image, setImage] = useState(null);
  const imgref = useRef();
  const [detail, setDetail] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  const desc = useRef();

  useLayoutEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
    axios
      .get(`http://localhost:5001/searchuser/${userInfo.Id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
    setToken(userInfo.token);
    setDetail(userInfo);
  }, []);

  // console.log(token);

  console.log(detail.Id);
  const onImageChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const closeimg = (e) => {
    e.preventDefault();
    if (image) {
      setImage(null);
      // console.log(image);
      // console.log(detail);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    const filename = image.name;
    data.append("userId", detail.Id);
    data.append("desc", desc.current.value);
    data.append("image", filename);
    data.append("file", image);

    // data.image=filename
    try {
      await axios
        .post(`http://localhost:5001/post/${detail.Id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(`there is an error during upload image ${error}`);
    }

    // console.log(newPost);
  };

  return (
    <div className="sharepostmaindiv">
      <img
        alt="profile pic"
        style={{ width: "50px", height: "50px", borderRadius: "2rem",marginLeft:'45%',marginTop:'10px' }}
        src={`http://localhost:5001/image2/${user.profilePicture}`}
      ></img>

      <input
        type="text"
        ref={desc}
        required
        placeholder="what is happening?"
        style={{ width: "600px" }}
      />
      <span>
        {" "}
        <button
          style={{ marginLeft: "10%" }}
          onClick={() => imgref.current.click()}
        >
          photo
        </button>
      </span>

      <span>
        <button style={{ marginLeft: "60%" }} onClick={handlesubmit}>
          share
        </button>
      </span>

      <div style={{ display: "none" }}>
        <input
          type="file"
          ref={imgref}
          name="myImage"
          onChange={onImageChange}
        />
      </div>

      <div>
        {image && (
          <>
            <img src={URL.createObjectURL(image)} className="imageopening" />
            <button onClick={closeimg}>close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sharepost;
