import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosStatic } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL = 'http://localhost:3000';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  setAuthToken(token?: string): void {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  request(method: string, url: string, data: any): Promise<any> {
    return axios.request({
      method,
      url,
      data
    });
  }

  async get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return (await axios.get(url, config)).data;
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return (await axios.post(url, data, config)).data;
  }

  async put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return (await axios.put(url, data, config)).data;
  }

  async delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return (await axios.delete(url, config)).data;
  }

  axios(): AxiosStatic {
    return axios;
  }
}
