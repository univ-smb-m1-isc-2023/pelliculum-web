import { Component, Input } from '@angular/core';
import { startWith } from 'rxjs';

@Component({
    selector: 'app-stars',
    standalone: true,
    imports: [],
    templateUrl: './stars.component.html',
    styles: ``
})
export class StarsComponent {
    @Input() rating: number | undefined;
    stars: string[] = [];

    constructor() {
        this.voteToStars();
        console.log(this.rating);
    }

    voteToStars() {
        console.log(this.rating);
        const starsRounded = Math.round(((this.rating ?? 0) / 2) * 2) / 2;
        const fullStars = Math.floor(starsRounded);
        const halfStar = starsRounded % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        const starsArray = Array(fullStars).fill('★');
        if (halfStar) starsArray.push('½');
        starsArray.push(...Array(emptyStars).fill('☆'));

        this.stars = starsArray;
    }
}
