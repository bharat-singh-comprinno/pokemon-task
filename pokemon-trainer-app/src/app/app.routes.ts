import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadComponent: () => import('./features/landing/landing').then(m => m.Landing)
  },
  {
    path: 'catalogue',
    loadComponent: () => import('./features/catalogue/catalogue').then(m => m.Catalogue)       
  },
  {
    path: 'trainer',
    loadComponent: () => import('./features/trainer/trainer').then(m => m.Trainer)
  },
  {
    path: '**',
    redirectTo: '/landing'
  }
];