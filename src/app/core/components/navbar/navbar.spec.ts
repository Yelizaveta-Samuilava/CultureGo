import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar'; // Correction du nom ici

describe('NavbarComponent', () => {
  let component: NavbarComponent; // Correction du type
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Comme c'est un composant standalone, on l'importe ici
      imports: [NavbarComponent], 
      providers: [provideRouter([])] 
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent); // Correction du nom ici
    component = fixture.componentInstance;
    fixture.detectChanges(); // Plus fiable que whenStable pour un test de création simple
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});