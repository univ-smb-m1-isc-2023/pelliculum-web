import { Injectable } from '@angular/core';
import axios, { Axios, AxiosRequestConfig, AxiosStatic } from 'axios';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AxiosService {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8080';
    }

    /**
     * Send a request to the server
     * @param method {string} - The HTTP method (GET, POST, PUT, DELETE)
     * @param url {string} - The URL to send the request to
     * @param data {any} - The data to send with the request
     */
    public request(method: string, url: string, data: any): Promise<any> {
        return axios.request({ method, url, data });
    }

    public async get(url: string, config?: AxiosRequestConfig): Promise<any> {
        return (await axios.get(url, this.getAuthorizationHeader(config))).data;
    }

    public async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
        return (await axios.post(url, data, this.getAuthorizationHeader(config))).data;
    }

    public async put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
        return (await axios.put(url, data, this.getAuthorizationHeader(config))).data;
    }

    public async delete(url: string, config?: AxiosRequestConfig): Promise<any> {
        return (await axios.delete(url, this.getAuthorizationHeader(config))).data;
    }

    public axios(): AxiosStatic {
        return axios;
    }

    private getAuthorizationHeader(config?: AxiosRequestConfig): any {
        let headers = config?.headers || {};
        const token: string | null = localStorage.getItem('token');
        if (token) {
            headers = { ...headers, Authorization: `Bearer ${token}` };
        }
        return { ...config, headers };
    }
}
