import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // Ajout de Location
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

  constructor(
    private router: Router,
    private location: Location // Injection du service Location
  ) {}

  ngOnInit() {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');

    if (storedName && storedEmail) {
      this.userName = storedName;
      this.userEmail = storedEmail;
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Fonction pour le bouton back.png
  goBack(): void {
    this.location.back();
  }

  onEditProfile() {
    this.isEditing = true;
  }

  onSave() {
    const oldEmail = localStorage.getItem('userEmail');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === oldEmail);

    if (userIndex !== -1) {
      users[userIndex].name = this.userName;
      users[userIndex].email = this.userEmail;

      localStorage.setItem('users', JSON.stringify(users));
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
    localStorage.removeItem('userEmail'); // Nettoyage propre
    this.router.navigate(['/login']);
  }

  onDeleteAccount() {
    if (confirm("Attention : Ton compte sera définitivement supprimé. Continuer ?")) {
      const emailToDelete = localStorage.getItem('userEmail');
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Filtrer pour supprimer uniquement cet utilisateur de la "base"
      users = users.filter((u: any) => u.email !== emailToDelete);
      localStorage.setItem('users', JSON.stringify(users));

      localStorage.clear();
      this.router.navigate(['/register']);
    }
  }
}