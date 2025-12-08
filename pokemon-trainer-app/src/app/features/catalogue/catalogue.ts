import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Pokemon } from '../../services/pokemon.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PokemonCard } from '../../shared/components/pokemon-card/pokemon-card';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonCard],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
})
export class Catalogue implements OnInit, OnDestroy {

  pokemonList = signal<any[]>([]);
  filteredPokemon = signal<any[]>([]);
  selectedPokemon = signal<any[]>([]);
  loading = signal(true);
  searchTerm = '';
  private searchSubject = new Subject<string>();

  constructor(
    private pokemonService: Pokemon,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPokemon();
    this.loadSelectedPokemon();
    this.setupSearch();
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  setupSearch() {
    this.searchSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      const filtered = this.pokemonList().filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.filteredPokemon.set(filtered);
    });
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

    this.pokemonService.getPokemonList(50).subscribe((res: any) => {
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

  onSearchChange() {
    this.searchSubject.next(this.searchTerm);
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
