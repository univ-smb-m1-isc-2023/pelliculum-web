import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header-sign',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './header-sign.component.html',
  styleUrls: ['./header-sign.component.sass']
})
export class HeaderSignComponent {
  connected = true;
  notif = 3;

}
