import {Component, OnInit} from '@angular/core';
import {TmdbService} from "../../../../core/services/tmdb.service";
import {Movie} from "../../../models/movie.model";

@Component({
  selector: 'app-game-actors',
  standalone: true,
  imports: [],
  templateUrl: './game-actors.component.html'
})
export class GameActorsComponent implements OnInit{

  actors = [{name: "Ryan Gosling", genre : 1}, {name: "Ana de Armas", genre: 2}];

  constructor(private tmdbService: TmdbService) {
  }
  ngOnInit() {
    this.tmdbService.getActors(1).subscribe((actors : any) => {
      console.log(actors);
      this.actors = actors;
    })
  }

}
