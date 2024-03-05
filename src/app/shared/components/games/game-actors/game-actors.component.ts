import {Component, Input, OnInit} from '@angular/core';
import {TmdbService} from "../../../../core/services/tmdb.service";
import {Movie} from "../../../models/movie.model";

@Component({
  selector: 'app-game-actors',
  standalone: true,
  imports: [],
  templateUrl: './game-actors.component.html'
})
export class GameActorsComponent implements OnInit {

  actorsDetail: any[] = [];
  @Input() guessActors: any[] = [];

  constructor(private tmdbService: TmdbService) {
  }

  ngOnInit() {
    this.tmdbService.getActors(15).subscribe((actors: any) => {
      for (let actor of actors.cast.slice(0, 10)) {
        this.tmdbService.getActorDetail(actor.id).subscribe((actorDetail: any) => {
          actorDetail.guessName = actor.name.replace(/[^ ]/g, '?');
          actorDetail.found = false;

          this.actorsDetail.push(actorDetail);
        })
      }
    })
  }

  ngOnChanges(changes: any) {
    console.log(this.guessActors)
    if (changes.guessActors) {
      this.actorsDetail.forEach(actorDetail => {
        if (this.guessActors.some(guessActor => guessActor.id === actorDetail.id)) {
          actorDetail.found = true;
        }
      });
    }
    console.log(this.actorsDetail)

  }
}

