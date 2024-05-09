export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    type?: string;
}

export interface Client extends User {
    address?: string;
    phone?: string;
    colorCode?: string;
}

export interface Admin extends User {}

export enum UserType {
    Client,
    Admin,
    Guest
}