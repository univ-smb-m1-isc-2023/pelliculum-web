import { Component } from '@angular/core';
import {ProfileTabsComponent} from "./profile-tabs/profile-tabs.component";
import {ProfileSecurityTabComponent} from "./profile-security-tab/profile-security-tab.component";
import {ProfileCustomizationTabComponent} from "./profile-customization-tab/profile-customization-tab.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileTabsComponent,
    ProfileSecurityTabComponent,
    ProfileCustomizationTabComponent,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent {
  activeTab: string = 'customization';

  constructor() {
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }
}
