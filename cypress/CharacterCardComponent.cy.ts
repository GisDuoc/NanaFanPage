import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"
import { IonicStorageModule } from "@ionic/storage-angular"
import { MountConfig } from "cypress/angular"
import { CharacterCardComponent } from "src/app/components/character-card/character-card.component"
import { CharactersPageRoutingModule } from "src/app/pages/characters/characters-routing.module"
import { StorageService } from "src/app/services/storage.service"

const config: MountConfig<CharacterCardComponent> = {

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [CharacterCardComponent],
  providers: [StorageService]
}

describe('CharacterCardComponent.cy.ts', () => {
  it('debería mostrar el nombre, banda e imagen del personaje', () => {
    const personajeDePrueba = {
  id: 1,
  nombre: 'Shin Okasaki',
  banda: 'Black Stones',
  imagen: 'src/assets/shin_okazaki.jpg',
  rol: 'Protagonista',
  personalidad: 'Seria',
  descripcion: 'Vocalista de una banda'
    };

    cy.mount(CharacterCardComponent, {
      ...config,
      componentProperties: {
        personaje: personajeDePrueba
      }
    });
    cy.get('ion-card-title').should('contain.text', 'Shin Okasaki');
    cy.get('ion-card-subtitle').should('contain.text', 'Black Stones');
    cy.get('img').should('have.attr', 'src', personajeDePrueba.imagen);
  });
});