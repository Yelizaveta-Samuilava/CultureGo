import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../../../core/components/navbar/navbar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  isEditing: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
  // On récupère les infos stockées lors du Login ou du Register
  const storedName = localStorage.getItem('userName');
  const storedEmail = localStorage.getItem('userEmail');

  if (storedName && storedEmail) {
    this.userName = storedName;
    this.userEmail = storedEmail;
  } else {
    // Si pas d'infos, on renvoie au login
    this.router.navigate(['/login']);
  }
}

  onEditProfile() {
    this.isEditing = true;
  }

  onSave() {
  // 1. Récupérer l'ancien email (pour retrouver l'utilisateur dans la liste)
  const oldEmail = localStorage.getItem('userEmail');
  
  // 2. Récupérer la liste globale des utilisateurs
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // 3. Trouver l'index de l'utilisateur qui a cet ancien email
  const userIndex = users.findIndex((u: any) => u.email === oldEmail);

  if (userIndex !== -1) {
    // 4. Mettre à jour l'utilisateur dans le tableau avec les nouvelles valeurs
    users[userIndex].name = this.userName;
    users[userIndex].email = this.userEmail;

    // 5. Sauvegarder le tableau mis à jour dans le localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // 6. Mettre à jour les infos de la session actuelle
    localStorage.setItem('userName', this.userName);
    localStorage.setItem('userEmail', this.userEmail);

    this.isEditing = false;
    alert("Profil mis à jour avec succès !");
  } else {
    alert("Erreur : Utilisateur introuvable dans la base.");
  }
}

  onCancel() {
    this.isEditing = false;
    this.ngOnInit();
  }

  onLogout() {
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }

  onDeleteAccount() {
    if (confirm("Attention : Ton compte sera définitivement supprimé. Continuer ?")) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}