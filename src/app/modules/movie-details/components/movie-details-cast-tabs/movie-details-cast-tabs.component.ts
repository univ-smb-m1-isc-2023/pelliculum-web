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
    limit: number = 11;
    showAll: boolean = false;

    constructor(private tmdbService: TmdbService) {}

    ngOnInit(): void {
        this.loadCast();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['id'] && !changes['id'].firstChange) {
            this.loadCast();
        }
    }

    loadCast() {
        this.tmdbService.getMovieCredits(this.id).subscribe(
            (response: any) => {
                this.cast = response.cast;
                console.log('Cast:', this.cast);
            },
            (error: any) => {
                console.error('Error fetching movie credits:', error);
            }
        );
    }

    showAllActors() {
        this.showAll = true;
    }

    showLessActors() {
        this.showAll = false;
    }
}
