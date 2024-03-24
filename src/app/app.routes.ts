import { Routes } from '@angular/router';
import { ProfileComponent } from './modules/profile/profile.component';
import { HomeComponent } from './modules/home/home.component';
import { GameClassicComponent } from './modules/games/game-classic/game-classic.component';
import { MovieListComponent } from './modules/movie-list/movie-list.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { SignupComponent } from './modules/authentication/signup/signup.component';
import { WatchlistComponent } from './modules/watchlist/watchlist.component';
import { MovieDetailsComponent } from './modules/movie-details/movie-details.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { MoviesSearchComponent } from './modules/movies-search/movies-search.component';
import { ActorPageComponent } from './modules/actor-page/actor-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: SignupComponent },
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'game/classic', component: GameClassicComponent },
    { path: 'watchlist', component: WatchlistComponent },
    { path: 'list/:id', component: MovieListComponent },
    { path: 'films/:genre', component: MoviesSearchComponent },
    { path: 'film/:id', component: MovieDetailsComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'actor/:id', component: ActorPageComponent }
];
