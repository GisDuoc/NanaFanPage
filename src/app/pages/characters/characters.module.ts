import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharactersPageRoutingModule } from './characters-routing.module';

import { CharactersPage } from './characters.page';
import { CharacterCardComponent } from 'src/app/components/character-card/character-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharactersPageRoutingModule,
    
  ],
  declarations: [CharactersPage,CharacterCardComponent]
})
export class CharactersPageModule {

  personajes = {}
}
