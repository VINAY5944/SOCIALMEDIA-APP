import React, { useEffect, useLayoutEffect, useState } from "react";
import "./infocard.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function Infocard() {
  const usr = useParams();
  const userId = usr.id;
  const nav=useNavigate()
  const [formData, setFormData] = useState([]);

  const [token, setToken] = useState("");
  const [profilePicture, setprofilePicture] = useState(null);
  const [coverPicture, setcoverPicture] = useState(null);
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
     setToken(userInfo.token)
    axios
      .get(`http://localhost:5001/searchuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const { password, ...others } = response.data;
        setFormData(others);
      });
  }, []);

  const editprofile = async () => {
    setShow(true);
  };

  ////handle the formdta excluding the images
  const handlechange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });

   
  };

  ////image setting

  const onimagechange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profilePicture"
        ? setprofilePicture(img)
        : setcoverPicture(img);
    }
  };

  //////new form data

  const formsubmitted = async (e) => {

    e.preventDefault();

    console.log(formData);
    let userData = formData;

    if (profilePicture) {
      const data = new FormData();
      const filename = profilePicture.name;
      data.append("name", filename);
      data.append("file", profilePicture);
      userData.profilePicture = filename;

      try {
        
    const userInfo = await  JSON.parse(localStorage.getItem("currentUserInfo"));
        await axios
          .put(`http://localhost:5001/updateuser/${userId}`,data, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
          });
      } catch (error) {
        console.log(`the error in the upload profile image ${error}`);
      }
    }
    if (coverPicture) {
      const data = new FormData();
      const filename = coverPicture.name;
      data.append("name",filename);
      data.append("file",coverPicture);
      userData.coverPicture = filename;

      try {
        

        const userInfo = await  JSON.parse(localStorage.getItem("currentUserInfo"));
        await axios
          .put(`http://localhost:5001/updateuser/${userId}`,data, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
          });
      } catch (error) {
        console.log(`the error in the upload cover image ${error}`);
      }
    }
    setShow(false);



    if(userData){
      try {
        

        const userInfo = await  JSON.parse(localStorage.getItem("currentUserInfo"));
        await axios
          .put(`http://localhost:5001/updateuser/${userId}`,userData, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
          });
      } catch (error) {
        console.log(`the error in the update user deatil ${error}`);
      }
    }
  };



  return (
    <div>
      
    
      <button onClick={editprofile} style={{marginTop:'5%',marginLeft:'35%'}}>edit profile</button>
      {show && (
        <div>
          <form>
            <div>
              {" "}
              <input
                name="firstname"
                type="text"
                value={formData.firstname}
                placeholder="firstname"
                onChange={handlechange}
              />
            </div>
            <div>
              {" "}
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                placeholder="lastname"
                onChange={handlechange}
              />
            </div>
            <div>
              {" "}
              <input
                type="text"
                name="about"
                value={formData.about}
                placeholder="about"
                onChange={handlechange}
              />
            </div>
            <div>
              {" "}
              <input
                type="text"
                name="livesIn"
                value={formData.livesIn}
                placeholder="livesin..."
                onChange={handlechange}
              />
            </div>
            <div>
              {" "}
              <input
                type="text"
                name="worksAt"
                value={formData.worksAt}
                placeholder="worksAt...."
                onChange={handlechange}
              />
            </div>

            <div>
              {" "}
              <input
                type="text"
                value={formData.bio}
                placeholder="bio...."
                onChange={handlechange}
              />
            </div>

            {/* images handling */}
            <div>
              profile picture
              <input
                type="file"
                value={null}
                placeholder="choose profile picture"
                onChange={onimagechange}
                name="profilePicture"
              />
            </div>
            <div>
              cover image
              <input
                type="file"
                value={null}
                placeholder="choose cover picture"
                onChange={onimagechange}
                name="coverPicture"
              />
            </div>

            <button onClick={formsubmitted}>update</button>
          </form>
        </div>
      )}
   
    </div>
  );
}

export default Infocard;
