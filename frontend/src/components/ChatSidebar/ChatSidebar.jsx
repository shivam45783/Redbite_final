import React, { useEffect } from "react";
import { useContext } from "react";
import "./ChatSidebar.css";
import { ChatContext } from "../../context/ChatContext";
const ChatSidebar = ({ riderId }) => {
  const { getUsers, user } = useContext(ChatContext);

  useEffect(()=>{
    getUsers(riderId);
  },[])
  return (
    <div className="chat-sidebar">
      <h1>Chats</h1>
      <p>Chat with the delivery agent</p>
      <div className="users">
        <h1>{user.name}</h1>
      </div>
    </div>
  );
};

export default ChatSidebar;
