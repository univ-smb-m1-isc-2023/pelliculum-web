import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosStatic } from 'axios';

@Injectable({
  providedIn: 'root',
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

  /**
   * Send a GET request to the server
   * @param url {string} - The URL to send the request to
   * @param config {AxiosRequestConfig} - The request configuration
   * @returns {Promise<any>} - The response from the server
   */
  public async get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return (await axios.get(url, this.getAuthorizationHeader(config))).data;
  }

  /**
   * Send a POST request to the server
   * @param url {string} - The URL to send the request to
   * @param data {any} - The data to send with the request
   * @param config {AxiosRequestConfig} - The request configuration
   * @returns {Promise<any>} - The response from the server
   */
  public async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return (await axios.post(url, data, this.getAuthorizationHeader(config))).data;
  }

  /**
   * Send a PUT request to the server
   * @param url {string} - The URL to send the request to
   * @param data {any} - The data to send with the request
   * @param config {AxiosRequestConfig} - The request configuration
   * @returns {Promise<any>} - The response from the server
   */
  public async put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return (await axios.put(url, data, this.getAuthorizationHeader(config))).data;
  }

  /**
   * Send a DELETE request to the server
   * @param url {string} - The URL to send the request to
   * @param config {AxiosRequestConfig} - The request configuration
   * @returns {Promise<any>} - The response from the server
   */
  public async delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return (await axios.delete(url, this.getAuthorizationHeader(config))).data;
  }

  /**
   * Get the axios instance
   * @returns {AxiosStatic} - The axios instance
   */
  public axios(): AxiosStatic {
    return axios;
  }

  /**
   * Get the authorization header
   * Note: This method is private and should not be called directly, it is used internally by the AxiosService
   * for all requests to the server, automatically adding the authorization header to the request
   * @param config {AxiosRequestConfig} - The request configuration
   * @private {AxiosRequestConfig} - The request configuration with the authorization header added
   */
  private getAuthorizationHeader(config?: AxiosRequestConfig): any {
    let headers = config?.headers || {};
    const token: string | null = localStorage.getItem('token');
    if (token) {
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }
    return { ...config, headers };
  }
}
