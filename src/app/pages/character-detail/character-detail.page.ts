import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: false
})
export class CharacterDetailPage implements OnInit {
   personaje: any;
  constructor(private router: Router,private route: ActivatedRoute,private storage: StorageService,private dbService: DbService) {

   }
  
async ngOnInit() {
const id = Number(this.route.snapshot.paramMap.get('id'));
    const currentUser = await this.storage.get('currentUser');
    const username = currentUser?.user || 'admin';

    this.personaje = await this.dbService.buscarPersonajePorId(id, username);

    if (!this.personaje) {
      console.warn('Personaje no encontrado.');
    }
  }


  logout() {
  this.router.navigate(['/characters']);
}
 }
