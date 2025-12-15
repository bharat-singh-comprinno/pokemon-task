import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { PokemonCard } from './pokemon-card';

describe('PokemonCard', () => {
  let component: PokemonCard;
  let fixture: ComponentFixture<PokemonCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCard);
    component = fixture.componentInstance;

    // Provide mock pokemon data
    component.pokemon = {
      name: 'pikachu',
      image: 'test-image-url',
      id: 1,
    };

    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display pokemon name capitalized', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h4')?.textContent).toBe('Pikachu');
  });

  it('should show "Catch" button when not collected', () => {
    component.isCollected = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button?.textContent?.trim()).toBe('Catch');
    expect(button?.disabled).toBe(false);
  });

  it('should show "Caught" button when collected', () => {
    component.isCollected = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button?.textContent?.trim()).toBe('Caught');
    expect(button?.disabled).toBe(true);
  });

  it('should emit catchPokemon event when button clicked', () => {
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.catchPokemon, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button?.click();

    expect(emitSpy).toHaveBeenCalledWith(component.pokemon);
  });

  it('should call onCatch method when button clicked', () => {
    fixture.detectChanges();
    const onCatchSpy = vi.spyOn(component, 'onCatch');

    const button = fixture.nativeElement.querySelector('button');
    button?.click();

    expect(onCatchSpy).toHaveBeenCalled();
  });
});
