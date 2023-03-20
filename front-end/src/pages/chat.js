import './chat.css';
import Button from '../components/Button.js'

const Chat = () => {
    return (
        <div className="chat">
            <h1>Your Conversation</h1>
          
            <div className='options'><Button text="Conversation with [DINER NAME]"/></div>
            <div className='options'><Button text="Conversation with [DINER NAME]"/></div>
            <div className='options'><Button text="Conversation with [DINER NAME]"/></div>
            <div className='options'><Button text="Conversation with [DINER NAME]"/></div>
        </div>
    );
}

export default Chat;