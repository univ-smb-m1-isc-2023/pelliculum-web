import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-profile-friends',
  standalone: true,
  imports: [
    TablerIconsModule,
  ],
  templateUrl: './profile-friends.component.html'
})
export class ProfileFriendsComponent {
  constructor() {}

}
