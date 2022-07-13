import { Component, OnInit } from '@angular/core';

import { Pokemon } from './models/pokemon.model';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public pokemons: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemonService.getAllPokemons()
    .subscribe(data => {
      this.pokemons = data;
      console.log(this.pokemons);
    })

  }
}
