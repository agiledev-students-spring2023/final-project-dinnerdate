import './chat.css';
import Chat from '../components/chat';
import { Link } from "react-router-dom";
import React from 'react';
import { useState } from 'react';


const Inbox = () => {
    return (
        <div className="inbox">
            <h1>Your Conversations</h1>
            <ChatRoom />
            <ChatRoom />
            <ChatRoom />
            <ChatRoom />
            <ChatRoom />
            {/* <Chat /> */}
            {/* <Chat /> */}
            {/* <ChatRoom /> */}
            {/* <Chat />
            <ChatRoom />
            <Chat />
            <ChatRoom />
            <Chat /> */}
        </div>
    );
}

const ChatRoom = (props) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    return (
        // replace with props.author or something
        <div>
        {/* <Link className="chat-room options" to="/chat/:userId"></Link> */}
        <button onClick={toggle}>Conversation with [DINER NAME]</button>
        <h1>{open && (<Chat />)}</h1>
        </div>
    )
}


export default Inbox;