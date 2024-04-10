import React from 'react';
import { formatDate, Message } from "../../../../model/conversation";
import { format } from 'date-fns';

interface Props {
    message: Message;
    isFirstMessageOfDay?: boolean;
}

export const MessageRow: React.FC<Props> = ({ message, isFirstMessageOfDay }) => {
    return (
        <div>
            {isFirstMessageOfDay && (
                <div className="messageDateLabel">
                    {format(new Date(message.timestamp), 'MMMM do yyyy')}
                </div>
            )}
            <div className="messageRow">
                <div className="profileIcon">{message.sender.firstName![0].toUpperCase()}</div>
                <div className="messageDetailsContent">
                    <div className="messageDetails">
                        <span className="username">{message.sender.firstName}</span>
                        <span className="date">{format(new Date(message.timestamp), 'HH:MM')}</span>
                    </div>
                    <div className="messageContent">{message.content}</div>
                </div>
            </div>
        </div>
    );
};
