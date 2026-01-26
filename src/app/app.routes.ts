import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { SearchComponent } from './features/events/search/search'; // Importe le nouveau composant
import { EventDetailComponent } from './features/events/event-detail/event-detail';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: SearchComponent }, // Ajoute cette ligne
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'event/:id', component: EventDetailComponent },
  { path: 'home', component: SearchComponent },
];

