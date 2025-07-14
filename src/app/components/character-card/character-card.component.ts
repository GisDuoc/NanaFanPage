import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/services/character';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  standalone: false
})
export class CharacterCardComponent  implements OnInit {

  @Input()
  personaje!: Character;
  
  infoCharacter(event: Event) {
    event.stopPropagation(); 
    console.log('Info personaje:', this.personaje);
  }
  constructor() {}

  ngOnInit() {
  }

}
