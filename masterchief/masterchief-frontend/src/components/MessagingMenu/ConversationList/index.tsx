import {useEffect, useState} from "react";
import {getUserId, signOut} from "../../../services/authService";
import {useNavigate} from "react-router-dom";
import {Conversation} from "../../../model/conversation";
import '../Messaging.css';
import {ConversationRow} from "./ConversationRow";

interface Props {
    conversations: Conversation[];
    onConversationClick: (conversation: Conversation) => void;
    activeConversation?: Conversation;
}
export const ConversationList = ({conversations, onConversationClick, activeConversation}: Props) => {
    const userId = getUserId();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(conversations);
        if (!userId) {
            signOut();
            navigate("/pageNotFound");
            return;
        }
    }, [userId]);

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