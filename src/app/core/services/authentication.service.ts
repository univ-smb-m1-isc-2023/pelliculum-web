import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { UserService } from './user.service';
import { Response } from '../../shared/models/api-response.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(
        private axiosService: AxiosService,
        private user: UserService
    ) {}

    /**
     * Send a request to the server to log in a user
     * If the request is successful, set the user's authentication token and username
     * @param values {any} - The user's registration information
     */
    public async login(values: any): Promise<any> {
        const response: Response = await this.axiosService.post('/auth/login', values);
        localStorage.clear();
        this.user.setAuthToken(response.data.token);
        this.user.setUsername(response.data.username);
    }

    /**
     * Send a request to the server to register a new user
     * If the request is successful, set the user's authentication token and username (log the user in)
     * @param values {any} - The user's registration information
     */
    public async register(values: any): Promise<any> {
        const response: Response = await this.axiosService.post('/auth/register', values);
        localStorage.clear();
        this.user.setAuthToken(response.data.token);
        this.user.setUsername(response.data.username);
    }
}
