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

  actorsDetail :any[] = [];

  constructor(private tmdbService: TmdbService) {
  }
  ngOnInit() {
    this.tmdbService.getActors(15).subscribe((actors : any) => {
      console.log(actors);
      for (let actor of actors.cast.slice(0, 10)){
        this.tmdbService.getActorDetail(actor.id).subscribe((actorDetail : any) => {
          actorDetail.guessName = '?'.repeat(actor.name.length);
          actorDetail.guessName = actor.name.replace(/[^ ]/g, '?');

          this.actorsDetail.push(actorDetail);
        })
      }
    })
  }

}
