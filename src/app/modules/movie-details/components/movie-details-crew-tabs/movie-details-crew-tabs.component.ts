import { Component, Input, OnInit } from '@angular/core';
import { TmdbService } from '../../../../core/services/tmdb.service';

@Component({
  selector: 'app-movie-details-crew-tabs',
  standalone: true,
  imports: [
  ],
  templateUrl: './movie-details-crew-tabs.component.html'
})
export class MovieDetailsCrewTabsComponent implements OnInit {
  @Input() id: number = 0;
  crew: any[] = [];
  limit: number = 11;
  showAll: boolean = false;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.loadCrew();
  }

  loadCrew() {
    this.tmdbService.getMovieCredits(this.id).subscribe(
      (response: any) => {
        this.crew = response.crew;
        console.log('Crew:', this.crew);
      },
      (error: any) => {
        console.error('Error fetching movie credits:', error);
      }
    );
  }

  showAllCrew() {
    this.showAll = true;
  }
}
