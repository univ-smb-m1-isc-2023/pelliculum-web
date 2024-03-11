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
        this.tmdbService.getMovieCredits(this.id).subscribe(
            (response: any) => {
                this.crew = response.crew.slice(0, 20);
                // Ci gît un console.log ... (console.log('Crew:', this.crew);)
            },
            (error: any) => {
                console.error('Error fetching movie credits:', error);
            }
        );
    }

    showAllCrew() {
        this.showAll = true;
    }

    showLessCrew() {
        this.showAll = false;
    }
}
