import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pokemon } from '../models/pokemon.model'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPokemons() {
    return this.http.get<Pokemon[]>('https://bp-pokemons.herokuapp.com/?idAuthor=1');
  }
}
