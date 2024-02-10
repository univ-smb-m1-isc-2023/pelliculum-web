import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header-sign',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './header-sign.component.html',
  styleUrls: ['./header-sign.component.sass']
})
export class HeaderSignComponent {
  connected = true;

}
