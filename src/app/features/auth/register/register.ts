import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // Import Location
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private location: Location // Injecté
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  goBack() {
    this.location.back();
  }

  onRegister() {
  if (this.registerForm.valid) {
    // 1. Récupérer le nom saisi dans le formulaire
    const nameToStore = this.registerForm.get('name')?.value;

    // 2. L'enregistrer pour le SearchComponent
    localStorage.setItem('userName', nameToStore); 

    // 3. Naviguer vers home
    this.router.navigate(['/home']); 
  }
}
}