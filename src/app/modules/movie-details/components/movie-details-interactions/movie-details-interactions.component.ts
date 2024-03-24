import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RatingsGraphComponent } from '../../../../shared/components/ratings-graph/ratings-graph.component';
import { StarsHoverableComponent } from '../../../../shared/components/stars-hoverable/stars-hoverable.component';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-movie-details-interactions',
  standalone: true,
  imports: [
    StarsComponent,
    TablerIconsModule,
    RatingsGraphComponent,
    StarsHoverableComponent,
  ],
  templateUrl: './movie-details-interactions.component.html'
})
export class MovieDetailsInteractionsComponent {
  @Input() reviews: any[] = [];
  @Input() selectedRating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();


  constructor(
    protected userService : UserService
  ) { }

  handleRatingChange(newRating: number) {
    this.ratingChange.emit(newRating);
  }

}
