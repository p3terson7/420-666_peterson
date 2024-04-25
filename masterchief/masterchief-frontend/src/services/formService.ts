import {AxiosResponse} from "axios";
import {FORM_PREFIX} from "../constants/apiPrefixes";
import http from "../constants/http";
import {BeginnerForm} from "../model/forms";

export const saveBeginnerForm = async (form: BeginnerForm): Promise<AxiosResponse<BeginnerForm>> => {
    return http.post(`${FORM_PREFIX}/forms`, form);
}