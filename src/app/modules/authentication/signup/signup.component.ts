import { Component } from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {SignupInformationComponent} from "./signup-information/signup-information.component";
import {SignupPreferencesComponent} from "./signup-preferences/signup-preferences.component";
import {LogoMoviePosterComponent} from "../../../shared/components/logo-movie-poster/logo-movie-poster.component";
import {SignupProgressionComponent} from "./signup-progression/signup-progression.component";
import {SignupPasswordComponent} from "./signup-password/signup-password.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgClass,
    SignupInformationComponent,
    SignupPreferencesComponent,
    LogoMoviePosterComponent,
    NgOptimizedImage,
    SignupProgressionComponent,
    SignupPasswordComponent,
    RouterLink
  ],
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  step : number = 1;
  constructor() {
  }

  test(){
    this.step += 1;
  }

}
