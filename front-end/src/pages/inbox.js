import './chat.css';
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
        <Link className="chat-room options" to="/chat/:userId"><button>Conversation with [DINER NAME]</button></Link>
    )
}


export default Inbox;