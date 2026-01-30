import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Ajout de Router
import { CommonModule, Location } from '@angular/common';
import { EventService } from '../../../core/services/event';
import { FavoriteService } from '../../../core/services/favorite.service'; // Import du service
import { NavbarComponent } from '../../../core/components/navbar/navbar';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.scss']
})
export class EventDetailComponent implements OnInit {
  event: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Pour la redirection
    private eventService: EventService,
    private favoriteService: FavoriteService, // Injection ici
    private cdr: ChangeDetectorRef,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(id).subscribe({
        next: (data) => {
          this.event = data;
          this.cdr.detectChanges();
        }
      });
    }
  }

  // Utilisation du service pour savoir si le coeur doit être rose
  get isFavorite(): boolean {
    return this.event ? this.favoriteService.isFavorite(this.event.id) : false;
  }

  toggleFavorite(): void {
    // 1. Vérifier si l'utilisateur est connecté (ton critère userName)
    const user = localStorage.getItem('userName');
    
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    // 2. Envoyer l'événement au service pour mise à jour
    if (this.event) {
      this.favoriteService.toggleFavorite(this.event);
      this.cdr.detectChanges(); // Force Angular à mettre à jour la couleur du coeur
    }
  }

  goBack(): void {
    this.location.back();
  }
}