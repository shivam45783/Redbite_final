import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ChatHome.css";
import ChatSidebar from "../../components/ChatSidebar/ChatSidebar";
import { ChatContext } from "../../context/ChatContext";

const ChatHome = () => {
  const { id: riderId } = useParams();
  const { getUsers } = useContext(ChatContext);
  useEffect(() => {
    getUsers(riderId);
  }, []);
  return (
    <>
      <ChatSidebar riderId={riderId} />
    </>
  );
};

export default ChatHome;
