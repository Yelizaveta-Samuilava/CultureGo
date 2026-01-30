import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoriteService } from '../../../core/services/favorite.service';
import { NavbarComponent } from '../../../core/components/navbar/navbar';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.refreshFavorites();
  }

  refreshFavorites(): void {
    this.favorites = this.favoriteService.getFavorites();
  }

  goBack(): void {
    this.location.back();
  }
}