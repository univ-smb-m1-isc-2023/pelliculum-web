import {Component, OnInit} from '@angular/core';
import {TmdbService} from "../../../core/services/tmdb.service";
import {GameGenresComponent} from "../../../shared/components/games/game-genres/game-genres.component";
import {Movie} from "../../../shared/models/movie.model";
import {GameDateComponent} from "../../../shared/components/games/game-date/game-date.component";
import {GameActorsComponent} from "../../../shared/components/games/game-actors/game-actors.component";

@Component({
<<<<<<< HEAD
    selector: 'app-game-classic',
    standalone: true,
    imports: [],
    templateUrl: './game-classic.component.html'
})
export class GameClassicComponent {}
=======
  selector: 'app-game-classic',
  standalone: true,
  imports: [
    GameGenresComponent,
    GameDateComponent,
    GameActorsComponent
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
>>>>>>> feature/classic-login
