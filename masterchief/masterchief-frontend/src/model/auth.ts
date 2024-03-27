export interface SignInRequest {
    email: string;
    password: string;
}

export interface TimedJwt {
    jwt: string;
    expiration: number;
}

export interface DecodedJwt {
    sub: string;
    iat: number;
    exp: number;
    id: string;
    email: string;
    authorities: Authority[];
    iss: string;
}

export enum Authority {
    CLIENT = "CLIENT",
    ADMIN = "ADMIN",
    GUEST = "GUEST",
    USER = "USER",
}