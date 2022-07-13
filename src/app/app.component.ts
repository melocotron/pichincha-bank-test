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
  public pokemonFiltered: Pokemon[] = [];
  public btnActive = true;

  constructor(
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemonService.getAllPokemons()
    .subscribe(data => {
      this.pokemons = data;
      console.log(this.pokemons);
      this.pokemonFiltered = this.pokemons;
    })
  }

  searchPokemon(evt: any) {
    if (evt.value !== '') {
      let name = evt.value;
      this.pokemonFiltered = this.pokemons.filter( pokemon => {
        return pokemon.name == name;
      })

      this.pokemonFiltered;
      console.log('filter', this.pokemonFiltered)
    } else {
      this.pokemonFiltered = this.pokemons;
      console.log('else filter', this.pokemonFiltered);
    }
  }

  newPokemon() {
    this.btnActive = !this.btnActive;
    setTimeout(() => {
      document.getElementById("newPokemon")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    console.log(this.btnActive)
  }

    disableBtn(evt: boolean) {
    console.log('event', evt);
    this.btnActive = evt;
  }
}
