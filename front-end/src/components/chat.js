import './restaurant-info.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Axios from 'axios';



const Chat = () => {
  const [chatData, setChatData] = useState({});
    const routeParams = useParams();
    
  
  const fetchChatInfo = (chatId) => {
    Axios.get(`http://localhost:3000/chatdata/${chatId}`)
      .then((res) => {
        const chat = res.data;
        setChatData({
          "user": chat["user"],
          "otherUser": chat["other_user"],
          "messages": chat["messages"],
        });
      })
      .catch((err) =>
        console.log("Error: " + (err ? err : "Unexpected error occurred."))
      );
  };
  
  return (
    <div class="chat-box">
    <div class="message-area">
      <p>Messages Appear Here</p>
    </div>
    <div class="input-area">
      <input type="text" placeholder="Type messages here..." />
      <input type="submit" value="Send" />
   </div> 
    {/* <div class="action-area">
      <button id="clear-chat-button">Clear Chat</button>
     <button id="block-user-button">Block User</button>
    </div> */}
  </div>
  );
}



  
export default Chat;