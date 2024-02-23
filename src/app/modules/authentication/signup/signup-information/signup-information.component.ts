import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Output("increment") increment: EventEmitter<any> = new EventEmitter()

  incrementStep(){
    this.increment.emit();
  }

}
