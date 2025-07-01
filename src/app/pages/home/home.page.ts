import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

usuario: any = {};
weatherData: any;

  constructor(private apiService: ApiService,private router: Router, private weatherService: WeatherService) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if(userId != null){
    this.apiService.getUserById(userId).subscribe({
      next: (res) => {
        this.usuario = res.user;
        console.log('usuario:', this.usuario);
      },
     error: (err) => {
  console.error('Error al obtener datos de geolocalización:', err);
  alert('Error: ' + JSON.stringify(err));
}
    })
    }
//clima
 this.weatherService.getWeather('Santiago').subscribe({
      next: data => {
        this.weatherData = data;
        console.log('Datos clima:', data);
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
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
