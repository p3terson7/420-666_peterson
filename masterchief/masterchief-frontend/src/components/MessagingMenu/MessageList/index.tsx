import React, { useState, useEffect } from "react";
import { getConversationMessages } from "../../../services/messagingService";
import { Message } from "../../../model/conversation";
import { MessageRow } from "./MessageRow";
import '../Messaging.css';
import {SendIcon} from "../../../assets/icons/icons";

interface ConcatenatedMessage extends Omit<Message, 'content'> {
    content: string;
    isFirstMessageOfDay?: boolean;
}

export const MessageList = () => {
    const [concatenatedMessages, setConcatenatedMessages] = useState<ConcatenatedMessage[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');

    useEffect(() => {
        getConversationMessages(1)
            .then(response => {
                const processedMessages = concatenateMessages(response.data);
                setConcatenatedMessages(processedMessages);
            });
    }, []);

    const concatenateMessages = (messages: Message[]): ConcatenatedMessage[] => {
        const concatenated: ConcatenatedMessage[] = [];
        let lastDate!: string;

        messages.forEach((message) => {
            const currentDate = new Date(message.timestamp).toDateString();
            const isNewDay = lastDate !== currentDate;
            lastDate = currentDate;

            if (!concatenated.length || isNewDay || message.sender.id !== concatenated[concatenated.length - 1].sender.id || new Date(message.timestamp).getTime() - new Date(concatenated[concatenated.length - 1].timestamp).getTime() > 60000) {
                concatenated.push({ ...message, isFirstMessageOfDay: isNewDay, content: message.content });
            } else {
                concatenated[concatenated.length - 1].content += `\n${message.content}`;
            }
        });

        return concatenated;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!messageInput.trim()) return;
        try {
            // await sendMessage(1, messageInput); // Assuming 1 is the conversation ID
            setMessageInput('');
            // Refresh messages after sending new message
            getConversationMessages(1).then(response => {
                const processedMessages = concatenateMessages(response.data);
                setConcatenatedMessages(processedMessages);
            });
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <>
            <ul className="ul">
                {concatenatedMessages.map((message, index) => (
                    <li key={index}>
                        <MessageRow message={message} isFirstMessageOfDay={message.isFirstMessageOfDay} />
                    </li>
                ))}
            </ul>
            <div className="messageInputContainer">
                <form onSubmit={handleSubmit} className="row messageInputForm">
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="col-12 messageInput"
                        placeholder="Envoyer un message..."
                    />
                    <button type="submit" className="col text-center sendButton"><SendIcon/></button>
                </form>
            </div>
        </>
    );
};
