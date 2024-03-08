import axios, { AxiosResponse } from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

export default http;