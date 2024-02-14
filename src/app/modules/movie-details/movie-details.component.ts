import { Component, OnInit } from '@angular/core';
import {TmdbService} from "../../core/services/tmdb.service";
import {ActivatedRoute} from "@angular/router";
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
  ],
  templateUrl: './movie-details.component.html',
  styles: ``
})
export class MovieDetailsComponent implements OnInit {
  currentMovie: any;
  searchResults: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.tmdbService.getMovieDetails(movieId).subscribe(
      (data) => {
        this.currentMovie = data;
        console.log('Current Movie:', this.currentMovie);
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    this.searchService.searchResults$.subscribe((results) => {
      this.searchResults = results;
      console.log('Search Results:', this.searchResults);

      const currentMovieId = this.currentMovie.id;
      console.log('Current Movie ID:', currentMovieId);

      const updatedMovie = this.searchResults.find(movie => movie.id === currentMovieId);
      console.log('Updated Movie:', updatedMovie);

      if (updatedMovie) {
        this.currentMovie = updatedMovie;
        console.log('Current Movie Updated:', this.currentMovie);
      }
    });
  }
}
