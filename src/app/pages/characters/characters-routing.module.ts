import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharactersPage } from './characters.page';
import { CharacterDetailPage } from '../character-detail/character-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CharactersPage
  },
    {
    path: ':id',
    component: CharacterDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersPageRoutingModule {}
