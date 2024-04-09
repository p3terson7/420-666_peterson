import {ConversationList} from "./ConversationList";
import './MessagingStylesheet.css';

export const MessagingMenu = () => {
    return (
        <div className="messagingMenu">
            <div className="conversationList">
                <ConversationList />
            </div>
            <div className="conversationContent">

                <div className="messages">
                    {/* Display messages of the selected conversation. Use <ConversationContent /> */}
                </div>
                <div className="messageInput">
                    {/* Input bar to write messages. Use <MessageInput /> and handle send action */}
                </div>
            </div>
        </div>
    );
}