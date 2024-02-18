import { Routes } from '@angular/router';
import { ProfileComponent } from './modules/profile/profile.component';
import { HomeComponent } from './modules/home/home.component';
import { MovieDetailsComponent } from './modules/movie-details/movie-details.component';
import { GameClassicComponent } from './modules/games/game-classic/game-classic.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'movie-details/:id', component: MovieDetailsComponent },
    { path: 'game/classic', component: GameClassicComponent }
];
