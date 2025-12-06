import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Trainer {

  API_URL = 'https://example-herokuapp.com/trainers';

  trainerName = signal<string>('');
  trainerData = signal<any>(null);

  constructor(private http: HttpClient) {}

  saveTrainerLocally(name: string) {
    localStorage.setItem('trainer', name);
    this.trainerName.set(name);
  }

  loadTrainerFromStorage() {
    const stored = localStorage.getItem('trainer');
    if (stored) this.trainerName.set(stored);
  }

  createTrainer(name: string) {
    return this.http.post(`${this.API_URL}`, { username: name });
  }

  getTrainer(name: string) {
    return this.http.get(`${this.API_URL}/${name}`);
  }

  updateTrainer(name: string, pokemonList: any[]) {
    return this.http.patch(`${this.API_URL}/${name}`, {
      pokemon: pokemonList
    });
  }
}
