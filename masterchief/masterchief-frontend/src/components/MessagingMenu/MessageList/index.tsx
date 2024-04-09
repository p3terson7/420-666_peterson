import { useEffect, useState } from "react";
import { getConversationMessages } from "../../../services/messagingService";
import { Message } from "../../../model/conversation";
import { MessageRow } from "./MessageRow";

interface ConcatenatedMessage extends Omit<Message, 'content'> {
    content: string;
}

export const MessageList = () => {
    const [concatenatedMessages, setConcatenatedMessages] = useState<ConcatenatedMessage[]>([]);

    useEffect(() => {
        getConversationMessages(1)
            .then(response => {
                const processedMessages = concatenateMessages(response.data);
                setConcatenatedMessages(processedMessages);
            });
    }, []);

    const concatenateMessages = (messages: Message[]): ConcatenatedMessage[] => {
        const concatenated: ConcatenatedMessage[] = [];
        messages.reduce((acc: ConcatenatedMessage | null, message: Message, index: number) => {
            if (!acc || message.sender.id !== acc.sender.id || new Date(message.timestamp).getTime() - new Date(acc.timestamp).getTime() > 60000) {
                acc = { ...message };
                concatenated.push(acc);
            } else {
                acc.content += `\n${message.content}`;
                acc.timestamp = message.timestamp;
            }
            return acc;
        }, null);
        return concatenated;
    };

    return (
        <ul className="ul">
            {concatenatedMessages.map((message, index) => (
                <li key={index}>
                    <MessageRow message={message} />
                </li>
            ))}
        </ul>
    );
};
