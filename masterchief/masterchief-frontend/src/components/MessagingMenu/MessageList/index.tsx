import { useEffect, useState } from "react";
import { getConversationMessages } from "../../../services/messagingService";
import { Message } from "../../../model/conversation";
import { MessageRow } from "./MessageRow";

interface ConcatenatedMessage extends Omit<Message, 'content'> {
    content: string;
    isFirstMessageOfDay?: boolean;
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

    return (
        <ul className="ul">
            {concatenatedMessages.map((message, index) => (
                <li key={index}>
                    <MessageRow message={message} isFirstMessageOfDay={message.isFirstMessageOfDay} />
                </li>
            ))}
        </ul>
    );
};
