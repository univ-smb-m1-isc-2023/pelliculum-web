import { Component, Input } from '@angular/core';
import { PosterComponent } from '../../../../shared/components/poster/poster.component';
import { IMovie } from '../../../../shared/models/movie.model';

@Component({
  selector: 'app-home-next-release',
  standalone: true,
  imports: [
    PosterComponent,
  ],
  templateUrl: './home-next-release.component.html'
})
export class HomeNextReleaseComponent {

  @Input() public upcomings: IMovie[] = [];

}
