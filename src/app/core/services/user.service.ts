import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { Router } from '@angular/router';
import { Response } from '../../shared/models/api-response.model';
import axios from 'axios';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private router: Router,
        private axiosService: AxiosService,
        private authenticationService: AuthenticationService
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
     * Check if the user is logged in
     * If the authentication token is found, the user is logged in, else the user is not logged in
     * @returns {boolean} - True if the user is logged in, false otherwise
     */
    public isLoggedIn(): boolean {
        return !!this.getAuthToken();
    }

    /**
     * Retrieve the user's profile image url
     * @returns {string} - The user's profile image url
     */
    public getProfileImage(): string {
        return `${axios.defaults.baseURL}/profilePictures/${this.getUsername()}.jpeg`
    }


    /**
     * Get the user's profile information
     * @returns {Promise<any>} - The user's profile information
     */
    public async get(): Promise<Response> {
        return this.axiosService.get(`/users/${this.getUsername()}`);
    }

    /**
     * Update the user's profile information
     * @param data {any} - The user's updated profile information
     * @returns {Promise<any>} - The user's updated profile information
     */
    public async update(data: any): Promise<Response> {
        return this.axiosService.put(`/users/${this.getUsername()}`, data);
    }

    /**
     * Upload the user's profile picture
     * @param file {File} - The user's profile picture
     * @returns {Promise<any>} - The response from the server
     */
    public async updateProfilePicture(file: File): Promise<Response> {
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
        await this.authenticationService.logout();
        await this.router.navigateByUrl('/');
    }

    /**
     * Get the user's follows
     * @returns {Promise<any>} - The user's friends
     */
    public async getFollows(): Promise<Response> {
        return this.axiosService.get(`/users/${this.getUsername()}/follows`);
    }

    /**
     * Get the user's follows details
     * @returns {Promise<any>} - The user's follows details
     */
    public async getFollowsDetails(): Promise<Response> {
        return this.axiosService.get(`/users/${this.getUsername()}/follows-details`);
    }

    /**
     * Get the user's followers
     * @returns {Promise<any>} - The user's followers
     */
    public async getFollowers(): Promise<Response> {
        return this.axiosService.get(`/users/${this.getUsername()}/followers`);
    }

    /**
     * Get the user's followers details
     * @returns {Promise<any>} - The user's followers details
     */
    public async getFollowersDetails(): Promise<Response> {
        return this.axiosService.get(`/users/${this.getUsername()}/followers-details`);
    }

    /**
     * Add a follow
     * @param username {string} - The follows username
     * @returns {Promise<any>} - The response from the server
     */
    public async addFollow(username: string): Promise<Response> {
        return this.axiosService.post(`/users/${this.getUsername()}/follows/${username}`);
    }

    /**
     * Remove a follow
     * @param username {string} - The follows username
     * @returns {Promise<any>} - The response from the server
     */
    public async removeFollow(username: string): Promise<Response> {
        return this.axiosService.delete(`/users/${this.getUsername()}/unfollows/${username}`);
    }
}
