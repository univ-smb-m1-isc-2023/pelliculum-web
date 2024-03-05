import { Component, EventEmitter, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-signup-confirmation',
    standalone: true,
    imports: [NgClass],
    templateUrl: './signup-confirmation.component.html'
})
export class SignupConfirmationComponent {
    discoverPossibilites: string[] = ['Réseaux sociaux', 'Proches', 'Publicité en ligne', 'Autre'];
    selectedPossibility: number = -1;

    @Output('increment') increment: EventEmitter<any> = new EventEmitter();
    incrementStep() {
        this.increment.emit();
    }
}
