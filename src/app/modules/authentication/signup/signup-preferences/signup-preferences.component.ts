import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SignupProgressionComponent } from '../signup-progression/signup-progression.component';
import { genres } from '../../../../configs/genres.config';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-signup-preferences',
    standalone: true,
    imports: [SignupProgressionComponent, NgClass],
    templateUrl: './signup-preferences.component.html'
})
export class SignupPreferencesComponent implements OnInit {
    @Output('increment') increment: EventEmitter<any> = new EventEmitter();
    filmGenres: any[] = [];
    numberSelection: number = 0;

    ngOnInit() {
        this.filmGenres = genres.map((genre) => ({
            ...genre, // Copie toutes les clés et valeurs existantes de l'objet genre
            selected: false // Ajoute la clé `selected` avec la valeur `false`
        }));
    }

    selectGenre(genre: any) {
        if (genre.selected) {
            genre.selected = false;
            this.numberSelection--;
        } else if (this.numberSelection < 5) {
            genre.selected = true;
            this.numberSelection++;
        }
    }

    incrementStep() {
        this.increment.emit();
    }
}
