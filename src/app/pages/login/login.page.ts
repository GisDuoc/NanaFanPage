import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  data = {
  user: "",
  password: ""
  }
 
  constructor(private router: Router,private alertController: AlertController,private storage: StorageService) { }


async ngOnInit() {}

async iniciar() {
  const users = await this.storage.get("users") || [];

 const user = users.find((u: any) =>
    u.user === this.data.user && u.password === this.data.password
  );

  if (user) {
    await this.storage.set('currentUser', user);
    let navigationExtras: NavigationExtras = {
      state: {
        sendUser: user.user,
        sendPswd: user.password
      }
    };
    this.router.navigate(['/home'], navigationExtras);
  } else {
    this.presentAlert("Usuario o contraseña incorrecta.");
  }
}

    async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'ALERTA!',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  getPassword(){
    this.router.navigate(['/forget-password'])
  }

  register(){
    this.router.navigate(['/register'])
  }
}
