import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { WeatherService } from 'src/app/services/weather.service';
import { DbService } from 'src/app/services/db.service';
import { Character } from 'src/app/services/character';
import { firstValueFrom } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

usuario: any = {};
personajes: Array<Character> = [];
weatherData: any;
state: any = {};

  constructor(private apiService: ApiService,private router: Router, private weatherService: WeatherService, private db: DbService,private storage: StorageService) {}

  ngOnInit() {
  this.cargarUsuarioYPersonajes();
  this.cargarClima();
}

private async cargarUsuarioYPersonajes() {
  const currentUser = await this.storage.get('currentUser');
  if (currentUser) {
   this.usuario = currentUser;
   const dbReady = await firstValueFrom(this.db.dbState());
       if (dbReady) {
      this.personajes = await this.db.buscarPersonajeDeUsuario(this.usuario);
    }
  } else {
    console.warn('No existe un usuario logueado en consola');
  }
}

private cargarClima() {
  this.weatherService.getWeather('Santiago').subscribe({
    next: data => {
      this.weatherData = data;
    },
    error: err => {
      console.error('Error al obtener clima', err);
    }
  });
}

  next(){
    this.router.navigate(['/characters'])
  }

  profile(){
    this.router.navigate(['/profile'])
  }

  
 close(){
    this.router.navigate(['/logout'], { replaceUrl: true });
    console.log('Cerrando sesión... ')
  }

  
}

