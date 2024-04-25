import {User} from "./user";

export interface Form {
    id?: number;
    type?: string;
}

export interface BeginnerForm extends Form {
    client: User;
    useCases: string[];
    description: string;
    rgbAccessories: string[];
    budget: string;
    configuration: string;
    specificRequirements?: string;
}

export enum FormType {
    beginner,
    advanced
}