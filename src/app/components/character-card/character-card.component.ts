import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userData } from 'src/app/data';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  standalone: false
})
export class CharacterCardComponent  implements OnInit {

  @Input() personaje: any = {};
  infoCharacter(event: Event) {
    event.stopPropagation(); 
    console.log('Info personaje:', this.personaje);
  }
  constructor() {}

  ngOnInit() {
  }

}
