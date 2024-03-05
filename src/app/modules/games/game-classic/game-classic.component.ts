import {Component, OnInit} from '@angular/core';
import {TmdbService} from "../../../core/services/tmdb.service";
import {GameGenresComponent} from "../../../shared/components/games/game-genres/game-genres.component";
import {Movie} from "../../../shared/models/movie.model";
import {GameDateComponent} from "../../../shared/components/games/game-date/game-date.component";
import {GameActorsComponent} from "../../../shared/components/games/game-actors/game-actors.component";

@Component({
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

  filmGenres : number[] = [];
  guessGenres : number[] = [];
  guessActors : any[] = [];

  ngOnInit() {
    this.tmdbService.getRandomMovie().then((movie: Movie) => {
      this.filmGenres = movie.genre_ids;
    })
  }

  test(){
    this.tmdbService.getRandomMovie().then((movie: any) => {
      this.guessGenres = movie.genre_ids;
      this.tmdbService.getActors(movie.id).subscribe((actors : any) => {
        this.guessActors = actors.cast
      })
    })
  }




}
