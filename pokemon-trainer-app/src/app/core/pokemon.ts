import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Pokemon {

  API = 'https://pokeapi.co/api/v2/pokemon?limit=200';

  constructor(private http: HttpClient) {}

  getPokemonList() {
    return this.http.get(this.API);
  }

  getPokemonDetails(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
