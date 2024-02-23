import axios, { AxiosInstance } from 'axios';

export const restAPI: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  validateStatus: (status: number) => status >= 200 && status < 300,
});


export default restAPI;
