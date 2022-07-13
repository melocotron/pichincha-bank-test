import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PokemonService } from "../../services/pokemon.service";
import { PokemonDto } from "../../models/pokemonDTO.model";

@Component({
  selector: 'app-new-pokemon',
  templateUrl: './new-pokemon.component.html',
  styleUrls: ['./new-pokemon.component.css']
})
export class NewPokemonComponent implements OnInit {

  @Output() changeBtn = new EventEmitter();

  rndInt: number = 0;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    image: new FormControl('', [Validators.required]),
    attack: new FormControl('', [Validators.required]),
    defense: new FormControl('', [Validators.required]),
  });



  constructor(
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
  }

  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // this.randomIntFromInterval(1, 6);


  cancelCreate() {
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth", block: "start" });
    this.changeBtn.emit('false');
  }

  onSubmit(dto: PokemonDto) {
    console.log(this.form.value);
    dto.hp = this.randomIntFromInterval(1, 50);
    dto.type = 'multi';
    dto.idAuthor = 1;
    this.pokemonService.createPokemon(dto)
    .subscribe(data => {
      console.log('created', data);
      this.refresh();
    })
  }

  refresh(): void {
      window.location.reload();
  }

}
