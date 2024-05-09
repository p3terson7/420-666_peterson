import React, { useState, useEffect, useRef } from "react";
import { getConversationMessages, sendMessage } from "../../../services/messagingService";
import { Conversation, Message } from "../../../model/conversation";
import { MessageRow } from "./MessageRow";
import '../Messaging.css';
import { getUserId } from "../../../services/authService";
import { getUserById } from "../../../services/userService";
import { User } from "../../../model/user";
import { enqueueSnackbar } from "notistack";

interface ConcatenatedMessage extends Omit<Message, 'content'> {
    content: string;
    isFirstMessageOfDay?: boolean;
}
interface Props {
    activeConversation: Conversation;
}

export const MessageList = ({ activeConversation }: Props) => {
    const [concatenatedMessages, setConcatenatedMessages] = useState<ConcatenatedMessage[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<User>();
    const [charCount, setCharCount] = useState<number>(0);
    const messageListRef = useRef<HTMLUListElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageInput(e.target.value);
        setCharCount(e.target.value.length);
    };

    useEffect(() => {
        if (!currentUser) {
            getUserById(parseInt(getUserId()!))
                .then(response => {
                    setCurrentUser(response.data);
                });
        }

        getConversationMessages(activeConversation!.id!)
            .then(response => {
                const processedMessages = concatenateMessages(response.data);
                setConcatenatedMessages(processedMessages);
            });
    }, [activeConversation, currentUser]);

    useEffect(() => {
        scrollToBottom();
    }, [concatenatedMessages]);

    const handleInput = () => {
        const textarea = textareaRef.current;
        const messageList = messageListRef.current;

        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;

            if (messageList && textarea.scrollHeight > 80 && textarea.scrollHeight < 500) {
                messageList.style.paddingBottom = `calc(${textarea.scrollHeight}px - 70px)`;
            }
        }
    };

    useEffect(() => {
        handleInput();
    }, [messageInput, charCount]);

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

    const handleSubmit = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        if (checkMessageTooLong()) return;

        await sendMessage({
            sender: currentUser!,
            content: messageInput,
            timestamp: new Date().toISOString(),
            conversation: activeConversation,
        }).then(() => {
            setMessageInput('');
            getConversationMessages(1)
                .then(response => {
                    const processedMessages = concatenateMessages(response.data);
                    setConcatenatedMessages(processedMessages);
                    setCharCount(0);
                });
        }).catch(e => {
            enqueueSnackbar("Failed to send message", { variant: 'error' });
            throw new Error(e);
        });
    };

    const checkMessageTooLong = () => {
        if (charCount > 800) {
            enqueueSnackbar("Message too long!", { variant: 'error' });
            return true;
        }
    }

    const scrollToBottom = () => {
        if (messageListRef.current && messageListRef.current.lastElementChild) {
            messageListRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e).then(r => r).catch(e => e);
            const textarea = e.target as HTMLTextAreaElement;
            textarea.blur();
        }
    };

    return (
        <>
            <ul className="ul" ref={messageListRef}>
                {concatenatedMessages.map((message, index) => (
                    <li key={index}>
                        <MessageRow message={message} isFirstMessageOfDay={message.isFirstMessageOfDay} />
                    </li>
                ))}
            </ul>
            <div className="messageAreaContainer">
                <form className="messageInputForm">
                    <textarea
                        ref={textareaRef}
                        value={messageInput}
                        onChange={onChange}
                        className="col messageArea"
                        placeholder="Envoyer un message..."
                        rows={1}
                        onKeyDown={handleKeyDown}
                        style={{overflow: 'hidden'}}
                    />
                    {charCount > 750 && (
                        <div className="charCounter text-center" style={{ color: charCount > 800 ? '#ff4d6b' : '#DBDEE1'}}>
                            {800 - charCount}
                        </div>
                    )}
                </form>
            </div>
        </>
    );
};
