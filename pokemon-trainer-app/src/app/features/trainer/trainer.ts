import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trainer as TrainerService } from '../../services/trainer.service';

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainer.html',
  styleUrls: ['./trainer.css']
})
export class Trainer implements OnInit {

  // trainerName: string = '';
  // selectedPokemons: any[] = [];

  constructor(private router: Router, public trainerService: TrainerService) {}

  ngOnInit(): void {
    // Get trainer name from localStorage
    // const storedName = localStorage.getItem('trainer');
    // if (storedName) this.trainerName = storedName;

    // const savedData = sessionStorage.getItem('selectedPokemon');
    // if (savedData) this.selectedPokemons = JSON.parse(savedData);
    this.trainerService.loadTrainerFromStorage();
    this.trainerService.loadSelectedPokemons();
  }

  removePokemon(name: string) {
    // this.selectedPokemons = this.selectedPokemons.filter(p => p.name !== name);
    // sessionStorage.setItem('selectedPokemon', JSON.stringify(this.selectedPokemons));
    this.trainerService.removePokemon(name);
  }

  logout() {
    // localStorage.removeItem('trainer');
    // sessionStorage.removeItem('selectedPokemon');
    this.trainerService.logout();
    this.router.navigate(['/landing']);
  }
}
