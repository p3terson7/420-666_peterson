import {formatDate, Message} from "../../../../model/conversation";
import '../../Messaging.css';

interface Props {
    message: Message;
}
export const MessageRow = ({ message }: Props) => {

    return (
        <div className="messageRow">
            <div className="profileIcon">{message.sender.firstName![0].toUpperCase()}</div>
            <div className="messageDetailsContent">
                <div className="messageDetails">
                    <div className="username">{message.sender.firstName}</div>
                    <div className="date">{formatDate(message.timestamp)}</div>
                </div>
                <div className="messageContent">{message.content}</div>
            </div>
        </div>
    )
}