import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private location: Location 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  goToHome() {
  this.router.navigate(['/home']);
}

  onLogin() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;
    
    // 1. Récupérer la liste des utilisateurs inscrits
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // 2. Chercher l'utilisateur
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      // 3. Enregistrer les infos de la session
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userEmail', user.email);
      
      this.router.navigate(['/home']);
    } else {
      alert("Email ou mot de passe incorrect !");
    }
  }
}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goBack() {
    this.location.back();
  }
}