import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-profile-tabs',
  templateUrl: './profile-tabs.component.html',
  standalone: true,
  imports: [
    NgClass
  ],
  styleUrls: ['./profile-tabs.component.scss']
})
export class ProfileTabsComponent {
  @Output() tabSelected = new EventEmitter<string>();
  activeTab: string = 'customization';
  borderClass = 'border-b-gray-50'; // Classe de bordure par défaut


  selectTab(tabName: string) {
    this.activeTab = tabName;
    this.tabSelected.emit(this.activeTab);
    this.borderClass = this.activeTab === 'customization' ? 'border-b-primary' : 'border-b-gray-50';

  }
}
