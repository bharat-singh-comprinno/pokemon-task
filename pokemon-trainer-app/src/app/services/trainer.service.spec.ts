// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { Trainer } from './trainer.service';

// describe('Trainer', () => {
//   let service: Trainer;

//   beforeEach(() => {
//     // TestBed.configureTestingModule({});
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule]
//     });
//     service = TestBed.inject(Trainer);

//     // Clear storage before each test
//     localStorage.clear();
//     sessionStorage.clear();

//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should save trainer name to localStorage', () => {
//     service.saveTrainerLocally('Ash');

//     expect(localStorage.getItem('trainer')).toBe('Ash');
//     expect(service.trainerName()).toBe('Ash');
//   });

//   it('should load trainer from localStorage', () => {
//     localStorage.setItem('trainer', 'Misty');

//     const result = service.loadTrainerFromStorage();

//     expect(result).toBe('Misty');
//     expect(service.trainerName()).toBe('Misty');
//   });

//   it('should return null when no trainer in storage', () => {
//     const result = service.loadTrainerFromStorage();
//     expect(result).toBeNull();
//   });

//   it('should logout and clear all data', () => {
//     localStorage.setItem('trainer', 'Brock');
//     sessionStorage.setItem('selectedPokemon', '[]');
//     service.trainerName.set('Brock');

//     service.logout();

//     expect(localStorage.getItem('trainer')).toBeNull();
//     expect(sessionStorage.getItem('selectedPokemon')).toBeNull();
//     expect(service.trainerName()).toBe('');
//     expect(service.selectedPokemons()).toEqual([]);
//   });

// });
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Trainer } from './trainer.service';

describe('Trainer', () => {
  let service: Trainer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Trainer,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(Trainer);

    // Clear storage before each test
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save trainer name to localStorage', () => {
    service.saveTrainerLocally('Ash');

    expect(localStorage.getItem('trainer')).toBe('Ash');
    expect(service.trainerName()).toBe('Ash');
  });

  it('should load trainer from localStorage', () => {
    localStorage.setItem('trainer', 'Misty');

    const result = service.loadTrainerFromStorage();

    expect(result).toBe('Misty');
    expect(service.trainerName()).toBe('Misty');
  });

  it('should return null when no trainer in storage', () => {
    const result = service.loadTrainerFromStorage();
    expect(result).toBeNull();
  });

  it('should logout and clear all data', () => {
    localStorage.setItem('trainer', 'Brock');
    sessionStorage.setItem('selectedPokemon', '[]');
    service.trainerName.set('Brock');

    service.logout();

    expect(localStorage.getItem('trainer')).toBeNull();
    expect(sessionStorage.getItem('selectedPokemon')).toBeNull();
    expect(service.trainerName()).toBe('');
    expect(service.selectedPokemons()).toEqual([]);
  });
});
