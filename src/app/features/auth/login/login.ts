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

  onLogin() {
    if (this.loginForm.valid) {
      // 1. On récupère l'email saisi
      const email = this.loginForm.get('email')?.value;
      
      // 2. On simule l'extraction d'un nom à partir de l'email
      // (ex: "amina" si l'email est amina@test.com)
      const firstName = email.split('@')[0];
      const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

      // 3. ON ENREGISTRE LE NOM (C'est l'étape qui te manquait)
      localStorage.setItem('userName', displayName);
      
      console.log('Utilisateur connecté :', displayName);
      
      // 4. Redirection vers la page home/search
      this.router.navigate(['/home']);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goBack() {
    this.location.back();
  }
}