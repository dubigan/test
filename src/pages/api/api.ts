import axios from "axios";

const BASE_URL = "https://pskov-php.herokuapp.com/";
// const BASE_URL = 'https://localhost:8002/';

const instance = axios.create({
    baseURL: BASE_URL,
    method: "POST",
    headers: {
        "content-type": "application/json",
    },
});

const api = {
    getItems: (url: string, params: any) => {
        // console.log('api.getItems params', params);
        return instance({
            url,
            data: { ...params },
        });
    },

    getItem: (url: string) => {
        console.log("api.getItem.url: ", url);
        return instance({ url, data: {} });
    },

    queryServer: (url: string, params: any) => {
        console.log("api.queryServer.url: ", url);
        return instance({ url, ...params });
    },
};

export default api;
