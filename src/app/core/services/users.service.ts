import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private axiosService: AxiosService) { }

  getAll(): Promise<any> {
    return this.axiosService.get('/users');
  }

  get(username: string): Promise<any> {
    return this.axiosService.get(`/users/${username}`);
  }

  update(username: string, data: any): Promise<any> {
    return this.axiosService.put(`/users/${username}`, data);
  }

}
