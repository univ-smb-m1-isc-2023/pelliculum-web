import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private axiosService: AxiosService) { }

  get() {

  }


}
