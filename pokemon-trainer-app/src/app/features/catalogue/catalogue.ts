import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Pokemon } from '../../core/pokemon';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
})
export class Catalogue implements OnInit {

  pokemonList = signal<any[]>([]);
  filteredPokemon = signal<any[]>([]);
  selectedPokemon = signal<any[]>([]);
  loading = signal(true);
  searchTerm = '';

  constructor(
    private pokemonService: Pokemon,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPokemon();
    this.loadSelectedPokemon();
  }

  loadPokemon() {
    const cached = sessionStorage.getItem('pokemonList');

    if (cached) {
      const list = JSON.parse(cached);
      this.pokemonList.set(list);
      this.filteredPokemon.set(list);
      this.loading.set(false);
      return;
    }

    this.pokemonService.getPokemonList().subscribe((res: any) => {
      const list = res.results.map((p: any) => ({
        name: p.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          p.url.split('/')[6]
        }.png`
      }));

      sessionStorage.setItem('pokemonList', JSON.stringify(list));
      this.pokemonList.set(list);
      this.filteredPokemon.set(list);
      this.loading.set(false);
    });
  }

  loadSelectedPokemon() {
    const saved = sessionStorage.getItem('selectedPokemon');
    if (saved) {
      this.selectedPokemon.set(JSON.parse(saved));
    }
  }

  filterPokemon() {
    const filtered = this.pokemonList().filter(p => 
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.filteredPokemon.set(filtered);
  }

  isCollected(name: string) {
    return this.selectedPokemon().some(p => p.name === name);
  }

  catchPokemon(pokemon: any) {
    if (this.isCollected(pokemon.name)) return;

    const updated = [...this.selectedPokemon(), pokemon];
    this.selectedPokemon.set(updated);
    sessionStorage.setItem('selectedPokemon', JSON.stringify(updated));
  }

  goToTrainer() {
    this.router.navigate(['/trainer']);
  }
}
