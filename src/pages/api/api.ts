import axios from 'axios';

// const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
const BASE_URL = 'https://pskov.herokuapp.com/testforjob/';
// console.log('api BASE_URL', BASE_URL);
// const BASE_URL = 'https://localhost:8002/';
// const BASE_URL = "http://192.168.2.105:5000/testforjob/";

const instance = axios.create({
  baseURL: BASE_URL,
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
});

const api = {
  getItem: (url: string) => {
    console.log('api.getItem.url: ', url);
    return instance({ url, data: {} });
  },

  queryServer: (url: string, params: any) => {
    return instance({ url, data: params });
  },
};

export default api;
