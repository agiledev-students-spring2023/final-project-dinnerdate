import './conversation.css';
import Button from '../components/Button.js'

const Conversation = () => {
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

  
export default Conversation;