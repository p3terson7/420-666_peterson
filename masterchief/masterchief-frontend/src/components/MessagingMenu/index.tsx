import {ConversationList} from "./ConversationList";
import './Messaging.css';
import {MessageList} from "./MessageList";
import {useEffect, useState} from "react";
import {getUserId, signOut} from "../../services/authService";
import {getUserConversations} from "../../services/messagingService";
import {useNavigate} from "react-router-dom";
import {Conversation} from "../../model/conversation";
import {enqueueSnackbar} from "notistack";

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
                enqueueSnackbar("Failed to fetch conversations", {variant: "error"});
                throw new Error(error);
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
                {conversations.length === 0 ? (
                    <div className="noConversationsMessage">
                        <h1 className="mb-2">It's as quiet as a library in here!</h1>
                        <h1 style={{fontWeight: 175}}>Looks like you haven't started any conversations yet.</h1>
                        <h1 style={{fontWeight: 175}}>Why not be the first to break the silence?</h1>
                        {/* TODO : Redirection*/}
                    </div>
                ) : (
                    <>
                        {activeConversation && <MessageList activeConversation={activeConversation}/>}
                    </>
                )}
            </div>
        </div>
    );
}