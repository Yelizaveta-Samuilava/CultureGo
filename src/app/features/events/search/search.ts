import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../../core/services/event';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule
  ],
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})
export class SearchComponent {
  searchQuery: string = '';
  events: any[] = [];

  constructor(private eventService: EventService) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.eventService.searchEvents(this.searchQuery).subscribe({
        next: (data) => {
          // Ticketmaster renvoie les données dans _embedded.events
          this.events = data._embedded?.events || [];
          console.log('Événements trouvés :', this.events);
        },
        error: (err) => console.error('Erreur API :', err)
      });
    }
  }
}