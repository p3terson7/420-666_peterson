import {AxiosResponse} from "axios";
import http from "../constants/http";
import {CONVERSATION_PREFIX, MESSAGE_PREFIX} from "../constants/apiPrefixes";
import {Conversation, Message} from "../model/conversation";

export const getUserConversations = async (userId: number): Promise<AxiosResponse<Conversation[]>> => {
    return http.get<Conversation[]>(`${CONVERSATION_PREFIX}/${userId}`);
};

export const getConversationMessages = async (conversationId: number): Promise<AxiosResponse<Message[]>> => {
    return http.get<Message[]>(`${MESSAGE_PREFIX}/${conversationId}`);
}

export const sendMessage = async (message: Message): Promise<AxiosResponse<Message>> => {
    return http.post(`${MESSAGE_PREFIX}/messages`, message);
}