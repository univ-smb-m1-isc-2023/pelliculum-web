import { Component } from '@angular/core';
import { SignupInformationComponent } from '../signup/signup-information/signup-information.component';
import { SignupPreferencesComponent } from '../signup/signup-preferences/signup-preferences.component';
import { NgOptimizedImage } from '@angular/common';
import { LogoMoviePosterComponent } from '../../../shared/components/logo-movie-poster/logo-movie-poster.component';
import { Router, RouterLink } from '@angular/router';
import { PosterComponent } from '../../../shared/components/poster/poster.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import {
  PelliculumLogoTitleComponent
} from '../../../shared/components/pelliculum-logo-title/pelliculum-logo-title.component';

@Component({
    selector: 'app-login',
    standalone: true,
  imports: [SignupInformationComponent, SignupPreferencesComponent, NgOptimizedImage, LogoMoviePosterComponent, RouterLink, PosterComponent, FormsModule, ReactiveFormsModule, PelliculumLogoTitleComponent],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    constructor(
        private authentication: AuthenticationService,
        private router: Router
    ) {}

    async login(): Promise<void> {
        await this.authentication.login(this.loginForm.value);
        await this.router.navigateByUrl('/');
    }
}
