import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Cela permet à toute l'application d'utiliser ce service
})
export class FavoriteService {
  private favKey = 'culturego_favs';

  constructor() {}

  // Récupérer la liste des favoris
  getFavorites(): any[] {
    const saved = localStorage.getItem(this.favKey);
    return saved ? JSON.parse(saved) : [];
  }

  // Vérifier si un événement spécifique est déjà en favori
  isFavorite(eventId: string): boolean {
    return this.getFavorites().some(f => f.id === eventId);
  }

  // Ajouter ou retirer un favori
  toggleFavorite(event: any): void {
    let favs = this.getFavorites();
    const index = favs.findIndex(f => f.id === event.id);

    if (index > -1) {
      // Si il y est déjà, on le retire
      favs.splice(index, 1);
    } else {
      // Sinon, on l'ajoute
      favs.push(event);
    }
    
    // On enregistre la nouvelle liste dans le navigateur
    localStorage.setItem(this.favKey, JSON.stringify(favs));
  }
}