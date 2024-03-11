import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TmdbService } from '../../../../core/services/tmdb.service';

@Component({
    selector: 'app-movie-details-cast-tabs',
    standalone: true,
    templateUrl: './movie-details-cast-tabs.component.html'
})
export class MovieDetailsCastTabsComponent implements OnInit, OnChanges {
    @Input() id: number = 0;
    cast: any[] = [];
    limit: number = 12;
    showAll: boolean = false;

    constructor(private tmdbService: TmdbService) {}

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['id'] && !changes['id'].firstChange) {
        }
    }

    showAllActors() {
        this.showAll = true;
    }

    showLessActors() {
        this.showAll = false;
    }
}
