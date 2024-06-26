import React from 'react';
import { Message } from "../../../../model/conversation";
import { format } from 'date-fns';

interface Props {
    message: Message;
    isFirstMessageOfDay?: boolean;
}

export const MessageRow: React.FC<Props> = ({ message, isFirstMessageOfDay }) => {
    const isAdmin = message.sender.type === 'admin';

    const backgroundColor = () => {
        if (isAdmin) {
            return "#FF5733";
        } else {
            return "colorCode" in message.sender && message.sender.colorCode ? message.sender.colorCode : "#9b59b6";
        }
    }

    return (
        <div className="mt-1">
            {isFirstMessageOfDay && (
                <div className="messageDateLabel">
                    {format(new Date(message.timestamp), 'MMMM do yyyy')}
                </div>
            )}
            <div className="messageRow m-3">
                <div className={`profileIcon ${isAdmin ? 'admin' : 'client'}`} style={{background: backgroundColor()}}>{message.sender.firstName![0].toUpperCase()}</div>
                <div className="messageDetailsContent">
                    <div className="messageDetails">
                        <span className={`username ${isAdmin ? 'admin' : 'client'}`} style={{color: backgroundColor()}}>{message.sender.firstName}</span>
                        <span className="date">{format(new Date(message.timestamp), 'HH:mm')}</span>
                    </div>
                    <div className="messageContent">{message.content}</div>
                </div>
            </div>
        </div>
    );
};
