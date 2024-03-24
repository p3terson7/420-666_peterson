import {USER_PREFIX} from "../constants/apiPrefixes";
import {User} from "../model/user";
import http from "../constants/http";
import {AxiosResponse} from "axios";

export const getUserById = async (id: number): Promise<AxiosResponse<User>> => {
    return http.get<User>(`${USER_PREFIX}/${id}`);
};