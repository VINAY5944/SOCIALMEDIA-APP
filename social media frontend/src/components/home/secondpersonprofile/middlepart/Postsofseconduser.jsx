import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Postsofseconduser = () => {

const userId=useParams()
const Id=userId.id

  const [secondUserPosts,setSecondUserposts]=useState([])

  const[token,setToken]=useState('')


  useLayoutEffect(() => {
  
   const userInfo = JSON.parse(localStorage.getItem('currentUserInfo'))
 setToken(userInfo.token)
 
  }, []) 

  
useEffect(() => {
 const fetchData = async (e) => {

   try {
     const userInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
   
     const response = await axios.post(
       'http://localhost:5001/allpost',
       {userId:Id},
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );

     setSecondUserposts(response.data);
   } catch (error) {
     console.error('Error fetching posts:', error);
   }
 };

 if (token) {
   fetchData();
 } else {
   console.log('no token available');
 }
}, [token]);


console.log(secondUserPosts);



  return (
    <div>

    
{secondUserPosts.map((item,index) =>(
    <>
        <div className="postcards" >
    
          <img  className="postimage" src={`http://localhost:5001/image1/${item.image}`} alt="image not available" />

          <h1 key={index}>{item.desc}</h1>
          <div>

          <h6>likes:{item.likes.length}</h6>
             
         </div>
        </div></>
      ))}




    </div>
  )
}

export default Postsofseconduser