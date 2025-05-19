import {Component, inject, Resource, signal} from '@angular/core';
import {PokemonService} from '../../shared/services/pokemon/pokemon.service';
import {ResourceList} from '../../shared/models/pokemon/pokemon.model';
import {PokemonCardsComponent} from './pokedex/pokemon-cards/pokemon-cards.component';
import {PokedexComponent} from './pokedex/pokedex.component';

@Component({
  selector: 'app-home',
  imports: [
    PokemonCardsComponent,
    PokedexComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
