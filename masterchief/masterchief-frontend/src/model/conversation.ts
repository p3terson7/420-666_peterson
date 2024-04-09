import {Admin, Client} from "./user";
import {format} from "date-fns";

export interface Conversation {
    id?: number;
    admin: Admin;
    client: Client;
}

export interface Message {
    id?: number;
    sender: Admin | Client;
    content: string;
    timestamp: string;
    conversation: Conversation;
}

export const formatDate = (date: string): string => {
    return format(new Date(date), "dd/MM/yyyy HH:mm");
}

