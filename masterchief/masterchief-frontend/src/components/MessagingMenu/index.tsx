import {ConversationList} from "./ConversationList";
import './Messaging.css';
import {MessageList} from "./MessageList";

export const MessagingMenu = () => {
    return (
        <div className="messagingMenu">
            <div className="conversationList">
                <ConversationList />
            </div>
            <div className="conversationContent">
                <div className="messages">
                    <MessageList />
                </div>
                <div className="messageInput">
                    {/* Input bar to write messages. Use <MessageInput /> and handle send action */}
                </div>
            </div>
        </div>
    );
}