import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { SearchComponent } from './features/events/search/search'; // Importe le nouveau composant
import { EventDetailComponent } from './features/events/event-detail/event-detail';
import { ProfileComponent } from './features/auth/profile/profile';


export const routes: Routes = [
  { path: 'home', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'event/:id', component: EventDetailComponent },
  // CHANGE CETTE LIGNE : On redirige maintenant vers 'home' par défaut
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'profile', component: ProfileComponent },
];

