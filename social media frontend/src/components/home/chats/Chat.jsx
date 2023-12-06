import React, { useEffect, useRef, useState } from "react";
import "./chats.css";
import logo from '../logoimg/socialmedia logo.png'
import axios from "axios";
import Conversation from "./Conversation";
import Chatbox from "./Chatbox";
import { io } from "socket.io-client";
import Searchchat from "./Searchchat";
const Chat = () => {
  const [chats, setChats] = useState([]);

  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const socket = useRef();
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUserInfo"));

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));

    if (userInfo) {
      try {
        axios
          .get(`http://localhost:5001/getchat/${userInfo.Id}`, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          })
          .then((response) => {
            setChats(response.data);
          });
        setCurrentUserId(userInfo.Id);
      } catch (error) {
        console.log(`the error in the chat page is ${error}`);
      }
    } else {
      console.log("user info not fetched from the local storage for chat page");
    }
  }, []);

  ///send msg to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    } else {
    }
  }, [sendMessage]);

  useEffect(() => {
    if (user) {
      try {
        socket.current = io("http://localhost:8800");
        socket.current.emit("new-user-add", user.Id);
        socket.current.on("get-users", (users) => {
          setOnlineUsers(users);
        });
      } catch (error) {
        console.log(`${error}`);
      }
    }
  }, []);

  //recieve msg from the socjket server

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-message", (data) => {
        setReceiveMessage(data);
      });
    }
  }, []);

  console.log(chats);

  return (
    <div className="chatmain">
      <div className="chatleftside">
      <img src={logo} alt="logo"  style={{height:'50px',width:'50px',borderRadius:'1rem',margin:'10px'}}  />
        <h2>chats</h2>
<Searchchat     />
        <div className="chatlist">
        <h5>conversations</h5>
          {chats.map((chats, index) => (
            <>
              <div
                onClick={() => {
                  setCurrentChat(chats);
                }}
              >
                <Conversation data={chats} currentUserId={currentUserId} />
              </div>
            </>
          ))}
        </div>
      </div>

      <div className="chatcontainer">
        {" "}
     
        <Chatbox
          currentChat={currentChat}
          currentUserId={currentUserId}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>

      {/* <Chatleft/> */}
      {/* <Chatcontainer/> */}
    </div>
  );
};

export default Chat;
