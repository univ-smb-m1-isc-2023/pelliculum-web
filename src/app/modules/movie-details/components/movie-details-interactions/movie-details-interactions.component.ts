import { Component, Input } from '@angular/core';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RatingsGraphComponent } from '../../../../shared/components/ratings-graph/ratings-graph.component';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-movie-details-interactions',
  standalone: true,
  imports: [
    StarsComponent,
    TablerIconsModule,
    RatingsGraphComponent,
  ],
  templateUrl: './movie-details-interactions.component.html'
})
export class MovieDetailsInteractionsComponent {

  @Input() movieId: number = 0;
  @Input() rating: number = 0;

  constructor(private user: UserService) {}

  protected async addToWatchlist(): Promise<void> {
    this.user.addWatchlist(this.movieId).then(() => {
      console.log('ok');
    }).catch(() => {

    })
  }


}
