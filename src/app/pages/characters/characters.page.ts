import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/services/character';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: false,
})
export class CharactersPage implements OnInit {
   personajes: Character[] = [];

  constructor(private router: Router, private dbService: DbService) {
  }

ngOnInit() {
}

  showDetails(p: any) {
    this.router.navigate(['/characters', p.id], {
    });
  }

  logout() {
  this.router.navigate(['/home'], { replaceUrl: true });
}


}
