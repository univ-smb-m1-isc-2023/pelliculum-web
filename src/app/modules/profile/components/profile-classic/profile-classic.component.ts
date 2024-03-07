import { Component } from '@angular/core';
import { PosterComponent } from '../../../../shared/components/poster/poster.component';
import { StarsComponent } from '../../../../shared/components/stars/stars.component';

@Component({
  selector: 'app-profile-classic',
  standalone: true,
  imports: [
    PosterComponent,
    StarsComponent,
  ],
  templateUrl: './profile-classic.component.html'
})
export class ProfileClassicComponent {

}
