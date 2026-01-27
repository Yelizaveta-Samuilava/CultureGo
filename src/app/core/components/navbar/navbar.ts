import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 1. Importe le module de routage

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule], // 2. Ajoute-le ici
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {}