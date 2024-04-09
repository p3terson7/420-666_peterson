import {Admin, Client} from "./user";

export interface Conversation {
    id?: number;
    admin: Admin;
    client: Client;
}