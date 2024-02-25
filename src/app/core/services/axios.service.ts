import { Injectable } from '@angular/core';
import axios, { Axios, AxiosRequestConfig, AxiosStatic } from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private router: Router) {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  setAuthToken(token?: string): void {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  setUsername(username?: string): void {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }

  async logout(): Promise<void> {
    this.setAuthToken();
    this.setUsername();
    await this.router.navigateByUrl('/');
  }

  clearStorage(): void {
    localStorage.clear();
  }

  request(method: string, url: string, data: any): Promise<any> {
    return axios.request({
      method,
      url,
      data
    });
  }

  async get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return (await axios.get(url, this.getAuthorizationHeader(config))).data;
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return (await axios.post(url, data, this.getAuthorizationHeader(config))).data;
  }

  async put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return (await axios.put(url, data, this.getAuthorizationHeader(config))).data;
  }

  async delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return (await axios.delete(url, this.getAuthorizationHeader(config))).data;
  }

  getAuthorizationHeader(config?: AxiosRequestConfig): any {
    let headers = config?.headers || {};
    const token: string | null = this.getAuthToken();
    if (token) {
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }
    return { ...config, headers };
  }

  axios(): AxiosStatic {
    return axios;
  }
}
