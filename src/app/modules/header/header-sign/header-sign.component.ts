import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HeaderPictureComponent} from "../header-picture/header-picture.component";

@Component({
  selector: 'app-header-sign',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    NgForOf,
    HeaderPictureComponent
  ],
  templateUrl: './header-sign.component.html',
  styleUrls: ['./header-sign.component.sass']
})
export class HeaderSignComponent {
  connected = true;
  notif : string = '3';
  items: any[] = []; // Replace `any` with your item type
  dropdownVisible: boolean = false;


  constructor() {
    this.items = [
      {label: 'Item 1', value: 1},
      {label: 'Item 2', value: 2},
      // Add more items as needed
    ];
  }

  toggleDropdown(event: Event) {
    this.dropdownVisible = !this.dropdownVisible;
    event.stopPropagation(); // Prevent event from closing the dropdown immediately
  }

  onItemSelect(item: any) {
    console.log("Selected item:", item);
    this.dropdownVisible = false; // Close the dropdown
  }

  closeDropdown() {
    this.dropdownVisible = false; // Method to close dropdown, can be called from elsewhere
  }
}
