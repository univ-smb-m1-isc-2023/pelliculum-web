import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SignupProgressionComponent} from "../signup-progression/signup-progression.component";

@Component({
  selector: 'app-signup-information',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    SignupProgressionComponent
  ],
  templateUrl: './signup-information.component.html'
})
export class SignupInformationComponent {

}
