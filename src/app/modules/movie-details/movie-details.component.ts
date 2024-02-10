import {Component} from '@angular/core';
import {TmdbService} from "../../core/services/tmdb.service";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './movie-details.component.html',
  styles: ``
})
export class MovieDetailsComponent {
  currentMovie: any;

  constructor(private route: ActivatedRoute,
              private tmdbService: TmdbService) {
  }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.tmdbService.getMovieDetails(movieId).subscribe(
      (data) => {
        this.currentMovie = data;

        console.log(data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
