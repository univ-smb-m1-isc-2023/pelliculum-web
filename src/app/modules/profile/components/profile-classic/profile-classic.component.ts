import { Component } from '@angular/core';
import { PosterComponent } from '../../../../shared/components/poster/poster.component';

@Component({
  selector: 'app-profile-classic',
  standalone: true,
  imports: [
    PosterComponent,
  ],
  templateUrl: './profile-classic.component.html'
})
export class ProfileClassicComponent {

}
