import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../pipes/capitalize-pipe';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  @Input() pokemon: any;
  @Input() isCollected: boolean = false;
  @Output() catchPokemon = new EventEmitter<any>();

  onCatch() {
    this.catchPokemon.emit(this.pokemon);
  }
}
