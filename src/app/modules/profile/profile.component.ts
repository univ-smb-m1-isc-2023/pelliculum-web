import { Component, OnInit } from '@angular/core';
import { ProfileTabsComponent } from './components/profile-tabs/profile-tabs.component';
import { ProfileSecurityTabComponent } from './components/profile-security-tab/profile-security-tab.component';
import {
  ProfileCustomizationTabComponent,
} from './components/profile-customization-tab/profile-customization-tab.component';
import { NgIf } from '@angular/common';
import { TmdbService } from '../../core/services/tmdb.service';
import { BackdropComponent } from '../../shared/components/backdrop/backdrop.component';
import { UserService } from '../../core/services/user.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [ProfileTabsComponent, ProfileSecurityTabComponent, ProfileCustomizationTabComponent, NgIf, BackdropComponent],
    templateUrl: './profile.component.html',
    styles: ``
})
export class ProfileComponent implements OnInit {
    activeTab: string = 'customization';
    movie: any;

    constructor(
        private tmdbService: TmdbService,
        protected user: UserService
    ) {}

    async ngOnInit(): Promise<void> {
        this.movie = (await this.tmdbService.getTopMovies())[0];
    }

    selectTab(tab: string) {
        this.activeTab = tab;
    }
}
