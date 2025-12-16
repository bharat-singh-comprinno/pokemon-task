import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDark = signal(false);

  toggle(): void {
    this.isDark.update(current => {
      const newTheme = !current;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newTheme);
      return newTheme;
    });
  }

  init(): void {
    const stored = localStorage.getItem('theme');
    const isDarkMode = stored === 'dark';
    this.isDark.set(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }
}
