import './chat.css';
import Button from '../components/Button.js'
import { Link } from "react-router-dom";

const Inbox = () => {
    return (
        <div className="inbox">
            <h1>Your Conversations</h1>
            <ChatRoom />
            <ChatRoom />
            <ChatRoom />
            <ChatRoom />
            <ChatRoom />
        </div>
    );
}

const ChatRoom = (props) => {
    return (
        // replace with props.author or something
        <div className="chat-room options">
            <Link to="/chat/:userId"><Button text="Conversation with [DINER NAME]"/></Link>
        </div>
    )
}


export default Inbox;