import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-profile-tabs',
  templateUrl: './profile-tabs.component.html',
  standalone: true,
  styles: ''
})
export class ProfileTabsComponent {
  @Output() tabSelected = new EventEmitter<string>();

  selectTab(tabName: string) {
    this.tabSelected.emit(tabName);
  }
}
