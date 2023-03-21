import './chat.css';
import Button from '../components/Button.js'
import { Link } from "react-router-dom";

const Chat = () => {
    return (
        <div className="chat">
            <h1>Your Conversation</h1>
          
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
            <Link to="/conversation"><Button text="Conversation with [DINER NAME]"/></Link>
        </div>
    )
}

export default Chat;