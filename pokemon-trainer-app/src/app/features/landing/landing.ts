import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from '../../core/trainer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

  username: string = '';

  constructor(private router: Router) {
    const saved = localStorage.getItem('trainer');
    if (saved) {
      this.router.navigate(['/catalogue']);
    }
  }

  login() {
    if (this.username.trim()) {
      localStorage.setItem('trainer', this.username);
      this.router.navigate(['/catalogue']);
    }
  }
}
