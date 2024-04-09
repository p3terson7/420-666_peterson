import {AxiosResponse} from "axios";
import http from "../constants/http";
import {CONVERSATION_PREFIX} from "../constants/apiPrefixes";
import {Conversation} from "../model/conversation";

export const getUserConversations = async (userId: number): Promise<AxiosResponse<Conversation[]>> => {
    return http.get<Conversation[]>(`${CONVERSATION_PREFIX}/${userId}`);
};