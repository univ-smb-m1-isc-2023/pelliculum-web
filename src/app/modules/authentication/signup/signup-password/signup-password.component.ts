import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-signup-password',
    standalone: true,
    imports: [],
    templateUrl: './signup-password.component.html'
})
export class SignupPasswordComponent {
    @Output('increment') increment: EventEmitter<any> = new EventEmitter();

    incrementStep() {
        this.increment.emit();
    }
}
