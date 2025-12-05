// src/app/features/landing/landing.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {
  username = '';

  constructor(private router: Router) {}

  login() {
    if (this.username.trim()) {
      // Save username directly in localStorage (no API, no service)
      localStorage.setItem('trainerName', this.username.trim());
      this.router.navigate(['/catalogue']);
    }
  }
}