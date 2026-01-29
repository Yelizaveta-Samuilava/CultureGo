import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../../core/services/event';
import { NavbarComponent } from '../../../core/components/navbar/navbar';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  events: any[] = [];
  userName: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef // On injecte le détecteur
  ) {}

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    const name = localStorage.getItem('userName');
    if (name) {
      this.userName = name;
      this.isLoggedIn = true;
      // On force la détection pour que le [class.is-logged] soit appliqué de suite
      this.cdr.detectChanges(); 
    } else {
      this.isLoggedIn = false;
    }
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.eventService.searchEvents(this.searchQuery).subscribe({
        next: (data) => this.events = data._embedded?.events || [],
        error: (err) => console.error('API Error:', err)
      });
    }
  }
}