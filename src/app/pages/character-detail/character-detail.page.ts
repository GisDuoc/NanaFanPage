import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: false
})
export class CharacterDetailPage implements OnInit {
   listaDePersonajes: any[] = [];

  constructor(private route: ActivatedRoute,private router: Router, private dbService: DbService) {

   }
  
ngOnInit() {
    this.dbService.dbState().subscribe((ready) => {
      if (ready) {
        this.cargarPersonajes();
      }
    });
}

cargarPersonajes() {
    this.dbService.buscarPersonajeDeUsuario('admin').then((characters) => {
      this.listaDePersonajes = characters;
      console.log('🧠 Personajes desde la BD:', characters);
    });
  }

  logout() {
  this.router.navigate(['/characters']);
}
 }
