import {Component, inject, signal} from '@angular/core';
import {PokemonService} from '../../../../shared/services/pokemon/pokemon.service';
import {ApiResponse, Pokemon, ResourceList} from '../../../../shared/models/pokemon/pokemon.model';
import {JsonPipe, NgClass} from '@angular/common';
import {GetSetService} from '../../../../shared/services/getSet/get-set.service';

@Component({
  selector: 'app-pokemon-cards',
  imports: [
    JsonPipe,
    NgClass
  ],
  templateUrl: './pokemon-cards.component.html',
  styleUrl: './pokemon-cards.component.css'
})
export class PokemonCardsComponent {
  #pokemonService = inject(PokemonService);
  getSet = inject(GetSetService);
  pokemonLists = signal<ResourceList[]>([]);
  pokemonDetails = signal<Pokemon[]>([]);

  loading = signal<boolean>(false);
  id = signal<number>(1);
  name = signal<string>("");

  // pokemonResource = httpResource<ApiResponse<ResourceList>>(
  //   () => `https://pokeapi.co/api/v2/pokemon/${this.name()}`
  // )

  loadGen(limit: number, offset: number) {
    this.getSet.limit = limit;
    this.getSet.offset = offset;
    this.loadPokemonList();
  }

  loadPokemonList() {
    this.loading.set(true);
    this.pokemonLists.set([]);
    this.pokemonDetails.set([]);
    const limit = this.getSet.limit;
    const offset = this.getSet.offset;

    this.#pokemonService.getPokemonByOffsetLimit(limit, offset).subscribe(pokemon => {
      this.pokemonLists.set(pokemon.results)
      this.loadPokemonDetailsFromList(pokemon.results);
    })
  }

  ngOnInit() {
    this.loading.set(true);
    this.loadGen(151,0);
  }

  loadPokemonDetailsFromList(list: ResourceList[]) {
    let loaded = 0;
    const total = list.length;
    const tempList: Pokemon[] = [];

    list.forEach(items => {
      this.#pokemonService.getPokemonByName(items.name).subscribe(pokemon => {
        tempList.push(pokemon);//concat use for extend arrays
        loaded++
        if (loaded >= total) {
          tempList.sort((a, b) => a.id - b.id);
          this.pokemonDetails.set(tempList);
          this.loading.set(false)
        }
      });
    });
  }

  getTypeNames(pokemon: Pokemon): string {
    return pokemon.types.map(t => t.type.name).join(', ');
  }

  getPrimaryTypeClass(pokemon: Pokemon): string {
    return `type-${pokemon.types[0]?.type.name || 'unknown'}`;
  }


}
