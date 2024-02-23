import {Component, EventEmitter, Output} from '@angular/core';
import {SignupProgressionComponent} from "../signup-progression/signup-progression.component";

@Component({
  selector: 'app-signup-preferences',
  standalone: true,
  imports: [
    SignupProgressionComponent
  ],
  templateUrl: './signup-preferences.component.html'
})
export class SignupPreferencesComponent {

  @Output("increment") increment: EventEmitter<any> = new EventEmitter()

  incrementStep(){
    this.increment.emit();
  }

}
