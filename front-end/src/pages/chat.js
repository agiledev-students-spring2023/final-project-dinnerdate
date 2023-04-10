import './restaurant-info.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const fetchChatInfo = () => {
  Axios.get(`http://localhost:3000/chatdata/${chatId}`)
      .then((res) => {
          const chat = res.data;
          setChatData({
              "user": chat["chat"],
              "otherUser": chat["otherUser"],
              "messages": chat["messages"],
              "message.text": chat["message.text"],
              "message.message_id": chat["message.message_id"]
          });
      })
      .catch(err => console.log("Error: " + err ? err : "Unexpected error occurred."));
};
const Chat = () => {

    const routeParams = useParams();
    return (
      <div class="chat-box">
      <div class="message-area">
        <p>Messages Appear Here</p>
      </div>
      <div class="input-area">
        <input type="text" placeholder="Type messages here..." />
        <input type="submit" value="Send" />
      </div>
      <div class="action-area">
        <button id="clear-chat-button">Clear Chat</button>
        <button id="block-user-button">Block User</button>
      </div>
    </div>
    );
  }


  
export default Chat;