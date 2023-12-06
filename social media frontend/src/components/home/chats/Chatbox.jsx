import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";

import "./chatbox.css";
import InputEmoji from "react-input-emoji";

const Chatbox = ({
  currentChat,
  currentUserId,
  setSendMessage,
  receiveMessage,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);

  const [newMessages, setNewMessages] = useState("");

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === currentChat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  //data for the header of the chat box
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
    const userId = currentChat?.members?.find((id) => id !== currentUserId);

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
  }, [currentChat, currentUserId]);

  //fetching data for messages
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/getmessage/${currentChat._id}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setMessages(response.data);
        console.log(response.data); // Log the response data here
      } catch (error) {
        console.log(`${error}`);
      }
    };

    if (currentChat !== null) {
      fetchMessages();
    }
  }, [currentChat]);

  console.log(currentChat);
  console.log(currentUserId);

  console.log(messages);

  const handleChange = (newMessages) => {
    setNewMessages(newMessages);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
    const message = {
      senderId: userInfo.Id,
      text: newMessages,
      chatId: currentChat._id,
    };

    try {
      const response = await axios.post(
        `http://localhost:5001/addmessage`,
        message,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setMessages([...messages, response.data]);
      setNewMessages("");
    } catch (error) {
      console.log(`${error}`);
    }

    //socket server
    const receiverId = currentChat.members.find((id) => id !== currentUserId);
    setSendMessage({ ...message, receiverId });
  };

  return (
    <div>
      Chatbox
      <div className="chatboxcontainer" style={{ border: "solid" }}>
        <div className="chatheader">
          <div className="follower">
            {userData ? (
              <>
                <img
                  src={`http://localhost:5001/image2/${userData.profilePicture}`}
                  alt="no profimg"
                  style={{ width: "50px", height: "50px" }}
                />
                <span>
                  {userData.firstname} {userData.lastname}
                </span>
                <div>
                  <span>online</span>
                </div>
                <div className="chatbody">
                  {messages.map((messages) => (
                    <>
                      <div
                        className={
                          messages.senderId == currentUserId
                            ? "messageown"
                            : "message"
                        }
                      >
                        <span>{messages.text}</span>
                        <span
                          style={{
                            fontSize: "10px",
                            marginTop: "40px",
                            alignSelf: "baseline",
                          }}
                        >
                          {format(messages.createdAt)}
                        </span>
                      </div>
                    </>
                  ))}{" "}
                </div>

                <div className="chatsender">
                  <InputEmoji
                    value={newMessages}
                    onChange={handleChange}
                    placeholder="Type a message"
                  />
                  <button className="sendbutton" onClick={handleSend}>
                    send
                  </button>
                </div>
              </>
            ) : (
              <p>select to chat</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
