import {Routes} from '@angular/router';
import {ProfileComponent} from "./modules/profile/profile.component";
import {HomeComponent} from "./modules/home/home.component";
import {GameClassicComponent} from "./modules/games/game-classic/game-classic.component";
import {SignupComponent} from "./modules/authentication/signup/signup.component";
import {LoginComponent} from "./modules/authentication/login/login.component";

export const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "profile", component: ProfileComponent},
  { path: "game/classic", component : GameClassicComponent},
  { path: "signup", component : SignupComponent},
  { path : "login", component : LoginComponent}
];
