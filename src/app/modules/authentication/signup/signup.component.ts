import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {SignupInformationComponent} from "./signup-information/signup-information.component";
import {SignupPreferencesComponent} from "./signup-preferences/signup-preferences.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgClass,
    SignupInformationComponent,
    SignupPreferencesComponent
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
