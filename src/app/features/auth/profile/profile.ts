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
    this.userName = localStorage.getItem('userName') || 'Utilisateur';
    this.userEmail = localStorage.getItem('userEmail') || 'email@culturego.com';
  }

  onEditProfile() {
    this.isEditing = true;
  }

  onSave() {
    localStorage.setItem('userName', this.userName);
    localStorage.setItem('userEmail', this.userEmail);
    this.isEditing = false;
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