import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userData } from 'src/app/data';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: false,
})
export class CharactersPage implements OnInit {
  data = {
    user: "",
    password: ""  
  };

  personajes = userData.characters;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state ?? history.state;
    this.data.user = state?.sendUser || "";
  }

  ngOnInit() {
  }

  showDetails(p: any) {
    this.router.navigate(['/characters', p.id], {
      state: { sendUser: this.data.user }
    });
  }

  logout() {
  this.router.navigate(['/logout'], { replaceUrl: true });
}


}
