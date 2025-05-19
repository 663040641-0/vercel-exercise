import {inject, Injectable} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {ApiResponse, Pokemon, ResourceList} from '../../models/pokemon/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  #httpClient = inject(HttpClient);

  getPokemonList() {
    return this.#httpClient.get<ApiResponse<ResourceList>>('https://pokeapi.co/api/v2/pokemon');
  }

  // pokemon select
  getPokemonByName(name: string) {
    return this.#httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  //gen select
  getPokemonByOffsetLimit(limit: number,offset: number) {
    return this.#httpClient.get<ApiResponse<ResourceList>>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }

  //get pokemon by id from signal
  pokemonResource = httpResource<ApiResponse<ResourceList>>(
    () => `https://pokeapi.co/api/v2/pokemon/`
  )

}
