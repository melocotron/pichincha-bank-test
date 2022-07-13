import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PokemonDto } from "../../models/pokemonDTO.model";

@Component({
  selector: 'app-new-pokemon',
  templateUrl: './new-pokemon.component.html',
  styleUrls: ['./new-pokemon.component.css']
})
export class NewPokemonComponent implements OnInit {

  @Output() changeBtn = new EventEmitter();

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    image: new FormControl('', [Validators.required]),
    attack: new FormControl('', [Validators.required]),
    defense: new FormControl('', [Validators.required]),
  });



  constructor() {
   }

  ngOnInit(): void {
  }




  cancelCreate() {
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth", block: "start" });
    this.changeBtn.emit('false');
  }

  onSubmit(evt: any) {
    console.log(this.form.value);
  }

}
