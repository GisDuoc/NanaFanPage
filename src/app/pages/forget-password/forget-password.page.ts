import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, createAnimation } from '@ionic/angular';

@Component({
  selector: 'app-forget-password',  
  templateUrl: './forget-password.page.html' ,
  styleUrls: ['./forget-password.page.scss'],
  standalone: false
})
export class ForgetPasswordPage implements AfterViewInit {
@ViewChild('card', { read: ElementRef }) card!: ElementRef;

 constructor(private router: Router, private alertController: AlertController) {}

  ngAfterViewInit() {
    const animation = createAnimation()
      .addElement(this.card.nativeElement)
      .duration(1200)
      .easing('cubic-bezier(0.68, -0.55, 0.27, 1.55)') 
      .keyframes([
        { offset: 0, opacity: '0', transform: 'translateX(-100%)' },
        { offset: 0.6, opacity: '1', transform: 'translateX(25px)' },
        { offset: 0.8, transform: 'translateX(-10px)' },
        { offset: 1, transform: 'translateX(0)' },
      ]);

    animation.play();
  }

  data = {
    email:""
  }

  sendEmail() {
    if(this.data.email == ""){
       this.presentAlert("El campo del correo no puede estar vacio.");
    }else{
    this.presentAlert("Se envió un correo para recuperar su clave :)");
    this.router.navigate(['/login']);
    }

  } 

      async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'HEY!',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
