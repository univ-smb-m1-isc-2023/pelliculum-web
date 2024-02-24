import { Component } from '@angular/core';
import {SignupInformationComponent} from "../signup/signup-information/signup-information.component";
import {SignupPreferencesComponent} from "../signup/signup-preferences/signup-preferences.component";
import {NgOptimizedImage} from "@angular/common";
import {LogoMoviePosterComponent} from "../../../shared/components/logo-movie-poster/logo-movie-poster.component";
import {RouterLink} from "@angular/router";
import {PosterComponent} from "../../../shared/components/poster/poster.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SignupInformationComponent,
    SignupPreferencesComponent,
    NgOptimizedImage,
    LogoMoviePosterComponent,
    RouterLink,
    PosterComponent
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

}
