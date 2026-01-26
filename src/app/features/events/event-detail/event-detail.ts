import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../core/services/event';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule], // RouterModule est vital pour le bouton Retour
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.scss']
})
export class EventDetailComponent implements OnInit {
  event: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID récupéré de lURL:', id);
    if (id) {
      this.eventService.getEventById(id).subscribe({
        next: (data) => {
          this.event = data;
          console.log('Détails chargés :', this.event);
        },
        error: (err) => console.error('Erreur de chargement', err)
      });
    }
  }
}