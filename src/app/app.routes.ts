import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { SearchComponent } from './features/events/search/search';
import { EventDetailComponent } from './features/events/event-detail/event-detail';
import { ProfileComponent } from './features/auth/profile/profile';

export const routes: Routes = [
  { path: 'home', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'event/:id', component: EventDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { 
    path: 'favorites', 
    loadComponent: () => import('./features/events/favorites/favorites').then(m => m.FavoritesComponent) 
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' } // Sécurité : redirige vers home si l'URL n'existe pas
];