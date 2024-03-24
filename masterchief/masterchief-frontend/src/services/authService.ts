import {Client} from "../model/user";
import { AxiosResponse } from "axios";
import http from "../constants/http";
import { CLIENT_PREFIX} from "../constants/apiPrefixes";
import {useNavigate} from "react-router-dom";

export const clientSignup = async (
  client: Client
): Promise<AxiosResponse> => {
  return http.post(`${CLIENT_PREFIX}/signup`, client);
};
