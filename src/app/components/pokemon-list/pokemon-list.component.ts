import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokemonService } from 'src/app/services/pokemon.service';

import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  public updateActive: boolean = false;
  public activateDelete: boolean = false;
  public pokemonUpdate: any;
  public pokemonToUpdate: any;
  public pokemonId: number = 0;
  private deleteId: number = 0;

  @Input('pokemonList') pokemonList: Pokemon[] = [];

  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    image: new FormControl('', [Validators.required]),
    attack: new FormControl('', [Validators.required]),
    defense: new FormControl('', [Validators.required]),
  });

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
  }

  onUpdateIcon(id: number) {
    this.updateActive = !this.updateActive;
    setTimeout(() => {
      document.getElementById("update")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    this.pokemonUpdate = this.pokemonList.find(pokemon => {
      return pokemon.id == id
    })
    this.pokemonId = id;
    console.log('pokemon selected', this.pokemonUpdate);
  }



  onSubmitUpdate(value: any) {
    console.log('this.updateForm.value ==>',this.updateForm.value);
    this.pokemonToUpdate = {
      id:        this.pokemonId,
      name:      this.updateForm.value.name,
      image:     this.updateForm.value.image,
      attack:    this.updateForm.value.attack,
      defense:   this.updateForm.value.defense,
      hp:        this.pokemonUpdate.hp,
      type:      this.pokemonUpdate.type,
      idAuthor:  this.pokemonUpdate.id_author
    };
    console.log('to update', this.pokemonToUpdate)
    this.pokemonService.updatePokemon(this.pokemonToUpdate.id, this.pokemonToUpdate)
    .subscribe(data => {
      console.log('created', data);
      this.refresh();
    })
  }

  cancelUpdate() {
    this.updateActive = !this.updateActive;
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  onDeleteIcon(id:number) {
    this.activateDelete = !this.activateDelete;
    this.deleteId = id;
    setTimeout(() => {
       document.getElementById("update")?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);

  }

  cancelDelete() {
    this.activateDelete = !this.activateDelete;
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  confirmDelete() {
    console.log('this.deleteId', this.deleteId);
    this.pokemonService.deletePokemon(this.deleteId)
    .subscribe(data => {
    })
    setTimeout(() => {
      this.refresh();
    }, 200);
  }

  refresh(): void {
      window.location.reload();
  }

}
