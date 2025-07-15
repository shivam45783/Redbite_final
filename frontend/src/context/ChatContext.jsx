import React, { createContext, useState, useContext } from "react";
import {StoreContext} from "./StoreContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getMessages } from "../../../backend/controllers/message.controller";
export const ChatContext = createContext(null);

const ChatContextProvider = (props) => {
    // const {token} = useContext(StoreContext);
  const url = "http://localhost:4000";
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [user, setUser] = useState(null);
  // const [isUserLoading, setIsUserLoading] = useState(false);
  // const [messageLoading, setMessageLoading] = useState(false);

  const getUsers = async (riderId) => {
    try {
      const response = await axios.post(`${url}/api/message/users`, {
        role: "user",
        
      }, {
        headers: {
          riderId
        }
      });
      if (response.data.success) {
        setUser(response.data.rider);
        // console.log(response.data.rider);
      }
      // console.log(response.data.rider);
      
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };
  const getMessages = async (id) => {
      const response = await axios.get(`${url}/api/message/${id}`)
      if (response.data.success) {
          setMessages(response.data.messages)
      }

  }
  const contextValue = {
    messages,
    setMessages,
    selectedUser,
    setSelectedUser,
    // isUserLoading,
    // setIsUserLoading,
    // messageLoading,
    // setMessageLoading,
    getUsers,
    user,
    getMessages
  };
  return (
    <ChatContext.Provider value={contextValue}>{props.children}</ChatContext.Provider>
  );
};

export default ChatContextProvider;
