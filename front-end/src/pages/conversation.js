import './conversation.css';
import Button from '../components/Button.js'

const Conversation = () => {
    return (
        <div class="chat-box">
          <div class="message-area">
            <p>Messages appear here</p>
          </div>
          <div class="input-area">
            <input type="text" placeholder="Type messages here..." />
            <input type="submit" value="Send" />
          </div>
        </div>
    );
  }
export default Conversation;