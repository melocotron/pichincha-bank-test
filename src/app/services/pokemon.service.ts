import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pokemon } from '../models/pokemon.model';
import { PokemonDto } from '../models/pokemonDto.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://bp-pokemons.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  getAllPokemons() {
    return this.http.get<Pokemon[]>(`${this.apiUrl}/?idAuthor=1`);
  }

  createPokemon(dto: PokemonDto) {
    return this.http.post<PokemonDto>(`${this.apiUrl}/?idAuthor=1`, dto);
  }

  updatePokemon(id: number, dto: Pokemon) {
    return this.http.put<PokemonDto>(`${this.apiUrl}/${id}`, dto);
  }

  deletePokemon(id: number) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
