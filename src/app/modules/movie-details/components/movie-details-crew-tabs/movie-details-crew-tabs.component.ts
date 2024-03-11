import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TmdbService } from '../../../../core/services/tmdb.service';

@Component({
    selector: 'app-movie-details-crew-tabs',
    standalone: true,
    imports: [],
    templateUrl: './movie-details-crew-tabs.component.html'
})
export class MovieDetailsCrewTabsComponent implements OnInit, OnChanges {
    @Input() id: number = 0;
    crew: any[] = [];
    limit: number = 12;
    showAll: boolean = false;

    constructor(private tmdbService: TmdbService) {}

    ngOnInit(): void {
        this.loadCrew();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['id'] && !changes['id'].firstChange) {
            this.loadCrew();
        }
    }

    loadCrew() {
    }

    showAllCrew() {
        this.showAll = true;
    }

    showLessCrew() {
        this.showAll = false;
    }
}
