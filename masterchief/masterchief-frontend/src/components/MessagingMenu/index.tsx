import {ConversationList} from "./ConversationList";
import './Messaging.css';
import {MessageList} from "./MessageList";
import {useEffect, useState} from "react";
import {getUserId, signOut} from "../../services/authService";
import {getUserConversations} from "../../services/messagingService";
import {useNavigate} from "react-router-dom";
import {Conversation} from "../../model/conversation";

export const MessagingMenu = () => {
    const userId = getUserId();
    const navigate = useNavigate();
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [activeConversation, setActiveConversation] = useState<Conversation>();

    useEffect(() => {
        if (!userId) {
            signOut();
            navigate("/pageNotFound");
            return;
        }

        getUserConversations(parseInt(userId))
            .then(response => {
                setConversations(response.data);
                setActiveConversation(response.data[0])
            })
            .catch(error => {
                console.error('Error fetching conversations:', error);
            });

        if (!activeConversation) {
            setActiveConversation(conversations[0]);
        }

    }, [userId]);

    const handleConversationClick = (conversation: Conversation) => {
        setActiveConversation(conversation);
    }

    return (
        <div className="messagingMenu">
            <div className="conversationList">
                <ConversationList conversations={conversations} onConversationClick={handleConversationClick} activeConversation={activeConversation}/>
            </div>
            <div className="conversationContent">
                <div className="messages">
                    {activeConversation && <MessageList activeConversation={activeConversation}/>}
                </div>
            </div>
        </div>
    );
}