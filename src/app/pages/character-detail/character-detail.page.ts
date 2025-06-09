import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userData } from 'src/app/data';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: false
})
export class CharacterDetailPage implements OnInit {
    data = {
    user: "",
    password: ""  
  };

   personaje: any;

  constructor(private route: ActivatedRoute,private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state ?? history.state;
    this.data.user = state?.sendUser || "";
   }
  
ngOnInit() {
   const id = Number(this.route.snapshot.paramMap.get('id'));
    this.personaje = userData.characters.find((p: { id: number }) => p.id === id);
}

  logout() {
  this.router.navigate(['/characters']);
}
 }
