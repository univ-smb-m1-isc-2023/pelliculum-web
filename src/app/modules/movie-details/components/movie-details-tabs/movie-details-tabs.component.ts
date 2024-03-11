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

    marker: HTMLDivElement | undefined;

    constructor() {}

    ngOnInit(): void {
        this.activeTab = 'cast';
        this.marker = document.getElementById('marker') as HTMLDivElement;
        const castTab: HTMLDialogElement | null = document.getElementById('cast-crew-info') as HTMLDialogElement;
        castTab.click();
    }

    selectTab(tabName: string) {
        this.activeTab = tabName;
        this.tabSelected.emit(this.activeTab);
    }

    indicator(e: any): void {
        if (!this.marker || !e) return;
        this.marker.style.left = e.target.offsetLeft + 'px';
        this.marker.style.width = e.target.offsetWidth + 'px';
    }
}
