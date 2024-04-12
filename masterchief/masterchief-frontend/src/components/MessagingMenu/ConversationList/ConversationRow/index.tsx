import {Admin} from "../../../../model/user";

interface Props {
    admin: Admin;
    onConversationClick: () => void;
    isActive: boolean;
}

export const ConversationRow = ({admin, onConversationClick, isActive}: Props) => {
    return (
        <div className={`conversationRow ${isActive ? 'activeConversation' : ''}`} onClick={onConversationClick}>
            <span style={{color: "#FF5733"}}>{admin.firstName}</span> (Admin)
        </div>
    );
}