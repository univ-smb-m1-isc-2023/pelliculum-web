import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-customization-tab',
  standalone: true,
  imports: [],
  templateUrl: './profile-customization-tab.component.html'
})
export class ProfileCustomizationTabComponent {
  constructor() {}

  name = 'Paul'
  lastname = 'Smith'
  email = 'paul.smith@gmail.com'


}
