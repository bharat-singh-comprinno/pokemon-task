// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { TrainerService } from '../services/trainer.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(
//     private trainerService: TrainerService,
//     private router: Router
//   ) {}

//   canActivate(): boolean {
//     if (this.trainerService.trainer) {
//       return true;
//     }
//     this.router.navigate(['/login']);
//     return false;
//   }
// }