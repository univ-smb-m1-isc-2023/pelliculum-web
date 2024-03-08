import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private router: Router,
        private axiosService: AxiosService
    ) {}

    /**
     * Get the authentication token from local storage
     * If the token is not found, return null
     * @returns {string | null} - The authentication token
     */
    public getAuthToken(): string | null {
        return localStorage.getItem('token');
    }

    /**
     * Get the username from local storage
     * If the username is not found, return null
     * @returns {string | null} - The username
     */
    public getUsername(): string | null {
        return localStorage.getItem('username');
    }

    /**
     * Set the authentication token in local storage
     * @param token {string} - The authentication token
     * If no token is provided, remove the token from local storage
     */
    public setAuthToken(token?: string): void {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }

    /**
     * Set the username in local storage
     * @param username {string} - The username
     * If no username is provided, remove the username from local storage
     */
    public setUsername(username?: string): void {
        if (username) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    }

    /**
     * Check if the user is logged in
     * If the authentication token is found, the user is logged in, else the user is not logged in
     * @returns {boolean} - True if the user is logged in, false otherwise
     */
    public isLoggedIn(): boolean {
        return !!this.getAuthToken();
    }

    /**
     * Get the user's profile information
     * @returns {Promise<any>} - The user's profile information
     */
    public async get(): Promise<any> {
        return this.axiosService.get(`/users/${this.getUsername()}`);
    }

    /**
     * Update the user's profile information
     * @param data {any} - The user's updated profile information
     * @returns {Promise<any>} - The user's updated profile information
     */
    public async update(data: any): Promise<any> {
        return this.axiosService.put(`/users/${this.getUsername()}`, data);
    }

    /**
     * Upload the user's profile picture
     * @param file {File} - The user's profile picture
     * @returns {Promise<any>} - The response from the server
     */
    public async updateProfilePicture(file: File): Promise<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.axiosService.post(`/users/${this.getUsername()}/profile-picture`, formData);
    }

    /**
     * Log the user out
     * Remove the authentication token and username from local storage
     * Redirect the user to the home page
     */
    public async logout(): Promise<void> {
        this.setAuthToken();
        this.setUsername();
        await this.router.navigateByUrl('/');
    }

    /**
     * Get the user's friends
     * @returns {Promise<any>} - The user's friends
     */
    public async getFriends(): Promise<any> {
        return this.axiosService.get(`/users/${this.getUsername()}/friends`);
    }

    /**
     * Add a friend
     * @param username {string} - The friend's username
     * @returns {Promise<any>} - The response from the server
     */
    public async addFriend(username: string): Promise<any> {
        return this.axiosService.post(`/users/${this.getUsername()}/friends/${username}`);

    }

}
