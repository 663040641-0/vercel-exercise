import {Component, inject, signal} from '@angular/core';
import {PokemonService} from '../../../shared/services/pokemon/pokemon.service';
import {ResourceList} from '../../../shared/models/pokemon/pokemon.model';
import {PokemonCardsComponent} from './pokemon-cards/pokemon-cards.component';

@Component({
  selector: 'app-pokedex',
  imports: [
    PokemonCardsComponent
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent {
  #pokemonService = inject(PokemonService);

  pokemonLists = signal<ResourceList[]>([]);

  loadPokemon() {
    this.#pokemonService.getPokemonList().subscribe(pokemon => {
        this.pokemonLists.set(pokemon.results);
      }
    );
  }

}
