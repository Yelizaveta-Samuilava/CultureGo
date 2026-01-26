import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiKey = 'kXznCkbwMYB7VSx0yUkRMOyUl3Sr9a2F';
  // On s'arrête à /v2/ pour pouvoir ajouter soit /events soit /events/id
  private baseUrl = 'https://app.ticketmaster.com/discovery/v2';

  constructor(private http: HttpClient) {}

  searchEvents(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/events.json?keyword=${keyword}&apikey=${this.apiKey}`);
  }

  getEventById(id: string): Observable<any> {
    // La bonne syntaxe Ticketmaster : /v2/events/{id}.json
    return this.http.get(`${this.baseUrl}/events/${id}.json?apikey=${this.apiKey}`);
  }
}