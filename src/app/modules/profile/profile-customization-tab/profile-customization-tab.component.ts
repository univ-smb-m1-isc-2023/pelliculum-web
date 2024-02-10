import { Component } from '@angular/core';
import {InputCustomComponent} from "../../../shared/components/input-custom/input-custom.component";

@Component({
  selector: 'app-profile-customization-tab',
  standalone: true,
  imports: [
    InputCustomComponent
  ],
  templateUrl: './profile-customization-tab.component.html'
})
export class ProfileCustomizationTabComponent {
  constructor() {}

  name = 'Paul'
  lastname = 'Smith'
  email = 'paul.smith@gmail.com'
  photo = 'https://www.w3schools.com/howto/img_avatar.png'
  pseudo = 'paulsmith'


}
