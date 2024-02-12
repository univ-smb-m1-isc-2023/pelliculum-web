import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BackdropComponent} from "../../../../shared/components/backdrop/backdrop.component";
import {TmdbService} from "../../../../core/services/tmdb.service";
import {StarsComponent} from "../../../../shared/components/stars/stars.component";

@Component({
  selector: 'app-backdrop-details',
  standalone: true,
  imports: [
    BackdropComponent,
    StarsComponent
  ],
  templateUrl: './backdrop-details.component.html',
  styles: ``
})
export class BackdropDetailsComponent implements OnChanges {

  @Input() movie: any;
  genres: {id: number, name: string}[] = [];

  constructor(private tmdService: TmdbService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['movie']) {
      this.genres = this.tmdService.getGenres(this.movie.genre_ids);
    }
  }
}
