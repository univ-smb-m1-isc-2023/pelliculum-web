import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-movie-details-tabs',
  standalone: true,
  imports: [NgClass],
  templateUrl: './movie-details-tabs.component.html'
})
export class MovieDetailsTabsComponent implements OnInit {
  @Output() tabSelected = new EventEmitter<string>();
  activeTab: string = 'cast';
  borderClass = 'border-b-gray-50';

  marker: HTMLDivElement | undefined;

  constructor() {}

  ngOnInit(): void {
    this.marker = document.getElementById('marker') as HTMLDivElement;
    const castTab:  HTMLDialogElement | null = document.getElementById('profile-private-info') as HTMLDialogElement;
    castTab.click();
  }

  selectTab(tabName: string) {
    this.activeTab = tabName;
    this.tabSelected.emit(this.activeTab);
    this.borderClass = this.activeTab === 'cast' ? 'border-b-primary' : 'border-b-gray-50';
  }

  indicator(e: any): void {
    console.log(e);
    if (!this.marker || !e) return;
    this.marker.style.left = e.target.offsetLeft + 'px';
    this.marker.style.width = e.target.offsetWidth + 'px';
  }

}
