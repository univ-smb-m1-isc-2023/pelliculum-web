import {Component, OnInit} from '@angular/core';
import {TmdbService} from "../../../core/services/tmdb.service";
import {GameGenresComponent} from "../../../shared/components/game-genres/game-genres.component";
import {Movie} from "../../../shared/models/movie.model";
import {GameDateComponent} from "../../../shared/components/game-date/game-date.component";

@Component({
  selector: 'app-game-classic',
  standalone: true,
  imports: [
    GameGenresComponent,
    GameDateComponent
  ],
  templateUrl: './game-classic.component.html'
})
export class GameClassicComponent implements OnInit {
  constructor(private tmdbService: TmdbService) {
  }

  movie : any;
  filmGenres : number[] = [];
  guessGenres : number[] = [];

  ngOnInit() {
    this.tmdbService.getRandomMovie().then((movie: Movie) => {
      this.filmGenres = movie.genre_ids;
    })
  }

  test(){
    this.tmdbService.getRandomMovie().then((movie: Movie) => {
      this.guessGenres = movie.genre_ids;
    })
  }




}
