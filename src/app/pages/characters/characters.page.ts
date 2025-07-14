import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/services/character';
import { DbService } from 'src/app/services/db.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: false,
})
export class CharactersPage implements OnInit {
   personajes: Character[] = [];

  constructor(private router: Router,private dbService: DbService,private storage: StorageService,private route: ActivatedRoute) {
  }

ngOnInit() {
    this.dbService.dbState().subscribe((ready) => {
    if (ready) {
      console.log("Base de datos lista, cargando personajes...");
      this.cargarPersonajes();
    } else {
      console.warn("La base de datos aún no está lista");
    }
  });
    const id = this.route.snapshot.paramMap.get('id');
  console.log('ID del personaje:', id);
}

async cargarPersonajes() {
  const currentUser = await this.storage.get('currentUser');
  const username = currentUser?.user || 'admin';

  this.dbService.buscarPersonajeDeUsuario(username).then((characters) => {
    console.log("Personajes encontrados:", characters);
    this.personajes = characters;
  }).catch((err) => {
    console.error("Error al buscar personajes:", err);
  });
}

  showDetails(p: any) {
    this.router.navigate(['/characters', p.id], {
    });
  }

  logout() {
  this.router.navigate(['/home'], { replaceUrl: true });
}


}
