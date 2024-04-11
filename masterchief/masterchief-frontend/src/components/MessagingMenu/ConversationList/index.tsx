import {Conversation} from "../../../model/conversation";
import '../Messaging.css';
import {ConversationRow} from "./ConversationRow";

interface Props {
    conversations: Conversation[];
    onConversationClick: (conversation: Conversation) => void;
    activeConversation?: Conversation;
}
export const ConversationList = ({conversations, onConversationClick, activeConversation}: Props) => {
    return (
        <div>
            {conversations.map(conversation => (
                <ConversationRow
                    key={conversation.id}
                    admin={conversation.admin}
                    onConversationClick={() => onConversationClick(conversation)}
                    isActive={conversation === activeConversation}
                />
            ))}
        </div>
    );
}