import './inbox.css';
import Chat from '../components/chat';
import { Link } from "react-router-dom";
import React from 'react';
import { useState } from 'react';
// const serverUrl = process.env.REACT_APP_SERVER_URL;
// const serverPort = process.env.REACT_APP_SERVER_PORT;

function Inbox() {
    // const [activeIndex, setActiveIndex] = useState(null);

    // const onItemClick = (index) => {
    //     setActiveIndex(index === activeIndex ? null : index);
    // };

    const chatRooms = [
        { id: 1, datename: "Johnny Appleseed" },
        { id: 2, datename: "Johnny Peachseed" },
        { id: 3, datename: "Johnny Noseed" },
        { id: 4, datename: "Spooky Scary Skeletons" },
      ];    

    const [openIndex, setOpenIndex] = useState(null);
    const handleClick = (index) => {
        if (index === openIndex){
            setOpenIndex(null);
        }
        else{
            setOpenIndex(index);
        }
    };

    return (
        <div className="inbox">
            <h1>My Conversations</h1>
            {chatRooms.map((chatRoom, index) => (
        <div key={chatRoom.id}>
          <button onClick={() => handleClick(index)}>
            Conversation with {chatRoom.datename}
          </button>
          {openIndex === index && <Chat />}
        </div>
      ))}
    </div>
  );
}



// const Inbox = () => {
//     return (
//         <div className="inbox">
//             <h1>Your Conversations</h1>
//             <ChatRoom />
//             <ChatRoom />
//             <ChatRoom />
//             <ChatRoom />
//             <ChatRoom />
//         </div>
//     );
// }

// const ChatRoom = (props) => {
//     // const [open, setOpen] = useState(false);

//     // const toggle = () => {
//     //     setOpen(!open);
//     // };

//     return (
//         // replace with props.author or something
//         <div>
//             <button>Conversation with {props.datename}</button>
//         {/* <button onClick={toggle}>Conversation with {datename}</button> */}
//         {/* <h1>{open && (<Chat />)}</h1> */}
//         </div>
//     )
// }


export default Inbox;