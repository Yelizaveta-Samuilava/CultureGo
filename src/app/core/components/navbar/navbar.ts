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
    this.checkAuthAndNavigate('/profile');
  }

  onFavoritesClick() {
    this.checkAuthAndNavigate('/favorites');
  }

  // Méthode générique pour vérifier la connexion
  private checkAuthAndNavigate(path: string) {
    const user = localStorage.getItem('userName');

    if (user) {
      this.router.navigate([path]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}