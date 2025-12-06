import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainer.html',
  styleUrls: ['./trainer.css']
})
export class Trainer implements OnInit {

  trainerName: string = '';
  selectedPokemons: any[] = [];

  ngOnInit(): void {
    // Get trainer name from localStorage
    const storedName = localStorage.getItem('trainer');
    if (storedName) this.trainerName = storedName;

    // Get selected pokemons from sessionStorage
    const savedData = sessionStorage.getItem('selectedPokemon');
    if (savedData) this.selectedPokemons = JSON.parse(savedData);
  }

  removePokemon(name: string) {
    this.selectedPokemons = this.selectedPokemons.filter(p => p.name !== name);
    
    // Update sessionStorage
    sessionStorage.setItem('selectedPokemon', JSON.stringify(this.selectedPokemons));
  }
}
