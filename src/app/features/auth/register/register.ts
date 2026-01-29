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
    const formData = this.registerForm.value;

    // 1. Récupérer la liste des utilisateurs existants ou créer un tableau vide
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // 2. Vérifier si l'email existe déjà
    if (users.find((u: any) => u.email === formData.email)) {
      alert("Cet email est déjà utilisé !");
      return;
    }

    // 3. Ajouter l'utilisateur à la "base de données"
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));

    // 4. Connecter l'utilisateur actuel
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userEmail', formData.email); // CRUCIAL pour le profil

    this.router.navigate(['/home']); 
    }
  }
}