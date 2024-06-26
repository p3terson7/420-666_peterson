import {Admin, Client} from "../../../../model/user";
import {getUserId} from "../../../../services/authService";

interface Props {
    admin: Admin;
    client: Client;
    onConversationClick: () => void;
    isActive: boolean;
}

export const ConversationRow = ({admin, client, onConversationClick, isActive}: Props) => {
    const currentUserId = getUserId();

    const nameToDisplay = () => {
        if (currentUserId == admin.id?.toString()) {
            return <span style={{color: client.colorCode ? client.colorCode : "#9b59b6"}}>{client.firstName}</span>;
        } else {
            return `${admin.firstName}`;
        }
    };

    return (
        <div className={`conversationRow ${isActive ? 'activeConversation' : 'conversation-row'}`} onClick={onConversationClick}>
            <span style={{color: "#FF5733"}}>{nameToDisplay()}</span>
        </div>
    );
}