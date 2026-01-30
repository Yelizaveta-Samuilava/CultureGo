import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventDetailComponent } from './event-detail';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventService } from '../../../core/services/event';
import { FavoriteService } from '../../../core/services/favorite.service';
import { of } from 'rxjs';

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // On importe HttpClientTestingModule pour ne pas faire de vrais appels API pendant les tests
      imports: [
        EventDetailComponent, 
        RouterModule.forRoot([]),
        HttpClientTestingModule
      ],
      providers: [
        EventService,
        FavoriteService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '123' // On simule un ID d'événement "123"
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Déclenche le ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});