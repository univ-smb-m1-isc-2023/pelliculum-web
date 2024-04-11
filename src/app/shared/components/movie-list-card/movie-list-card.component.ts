import { Component, Input } from '@angular/core';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-movie-list-card',
    standalone: true,
    imports: [BackdropComponent, RouterLink],
    templateUrl: './movie-list-card.component.html'
})
export class MovieListCardComponent {
    @Input() list: any;

    /**
     * Return the name of the list with no accents and space replaced by hyphens
     */
    getListUrl() {
        return this.list.name
            .toLowerCase()
            .replace(/ /g, '-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }
}
