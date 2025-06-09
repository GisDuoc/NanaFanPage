import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { userData } from 'src/app/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  data = {
  user: "",
  password: ""
  }
 
  constructor(private router: Router,private alertController: AlertController) { }

  iniciar(){
    const user = userData.users.find(u => u.user === this.data.user && u.password === this.data.password);
    if (user){
      
      //variable de contexto
      let navigationExtras: NavigationExtras = {
        state: {
          sendUser: this.data.user,
          sendPswd: this.data.password
        }
      }
      //redirigir
      this.router.navigate(['/characters'],navigationExtras)
      
    }else{
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
}
