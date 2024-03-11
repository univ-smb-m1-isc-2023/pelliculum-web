import { Component } from '@angular/core';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-movie-details-interactions',
  standalone: true,
  imports: [
    StarsComponent,
    TablerIconsModule,
  ],
  templateUrl: './movie-details-interactions.component.html'
})
export class MovieDetailsInteractionsComponent {

}
