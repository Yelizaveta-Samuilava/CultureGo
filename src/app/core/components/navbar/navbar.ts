import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  onProfileClick() {
    // On vérifie si l'utilisateur est stocké dans le localStorage
    const user = localStorage.getItem('userName');

    if (user) {
      // Si le nom existe, l'utilisateur est considéré comme connecté
      this.router.navigate(['/profile']);
    } else {
      // Sinon, on l'envoie vers la page de login
      this.router.navigate(['/login']);
    }
  }
}