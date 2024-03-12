import { Component, Input } from '@angular/core';
import { genres } from '../../../../configs/genres.config';

@Component({
    selector: 'app-game-genres',
    standalone: true,
    imports: [],
    templateUrl: './game-genres.component.html'
})
export class GameGenresComponent {
    foundGenre: [number, string, boolean][] = [];
    @Input() filmGenre: number[] = [];
    @Input() guessGenre: number[] = [];
    constructor() {}

    ngOnChanges(changes: any) {
        if (changes.filmGenre) {
            for (let genre of this.filmGenre) {
                let match = genres.find((g) => g.id === genre);
                if (match) {
                    this.foundGenre.push([match.id, match.name, false]);
                }
            }
        }
        if (changes.guessGenre) {
            for (let genre of this.foundGenre) {
                if (this.guessGenre.includes(genre[0])) {
                    genre[2] = true;
                }
            }
        }
    }
}
