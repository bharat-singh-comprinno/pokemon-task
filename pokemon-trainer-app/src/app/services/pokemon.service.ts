import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Pokemon {

  // API = 'https://pokeapi.co/api/v2/pokemon?limit=200';
  private baseAPI = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // getPokemonList() {
  //   return this.http.get(this.API);
  // }
  getPokemonList(limit: number = 200) {
    return this.http.get(`${this.baseAPI}?limit=${limit}`);
  }

  getPokemonDetails(name: string) {
    // return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return this.http.get(`${this.baseAPI}/${name}`);
  }
}
