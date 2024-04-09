import {Admin} from "../../../../model/user";

interface Props {
    admin: Admin;
}
export const ConversationRow = ({admin}: Props) => {
    return (
        <div className="conversation-row">
            {admin.firstName + " (Admin)"}
        </div>
    );
}