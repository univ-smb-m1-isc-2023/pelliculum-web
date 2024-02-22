import { Component, Input, OnInit } from '@angular/core';
import { TmdbService } from '../../../../core/services/tmdb.service';

@Component({
  selector: 'app-movie-details-cast-tabs',
  standalone: true,
  imports: [],
  templateUrl: './movie-details-cast-tabs.component.html'
})
export class MovieDetailsCastTabsComponent implements OnInit {
  @Input() id: number = 0;
  cast: any[] = [];

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
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
}

