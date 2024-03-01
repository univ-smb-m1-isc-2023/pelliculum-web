import { Component } from '@angular/core';
import { SignupInformationComponent } from '../signup/signup-information/signup-information.component';
import { SignupPreferencesComponent } from '../signup/signup-preferences/signup-preferences.component';
import { NgOptimizedImage } from '@angular/common';
import { LogoMoviePosterComponent } from '../../../shared/components/logo-movie-poster/logo-movie-poster.component';
import { Router, RouterLink } from '@angular/router';
import { PosterComponent } from '../../../shared/components/poster/poster.component';
import { AxiosService } from '../../../core/services/axios.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SignupInformationComponent,
    SignupPreferencesComponent,
    NgOptimizedImage,
    LogoMoviePosterComponent,
    RouterLink,
    PosterComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private axiosService: AxiosService, private router: Router) {
  }

  async login(): Promise<void> {
    const response = await this.axiosService.post('/auth/login', this.loginForm.value)
    this.axiosService.setAuthToken(response.token);
    this.axiosService.setUsername(response.username);
    await this.router.navigateByUrl('/')
  }


}