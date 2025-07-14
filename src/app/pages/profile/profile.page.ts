import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})

export class ProfilePage implements OnInit {

  @ViewChild('popover') popover!: HTMLIonPopoverElement;
  @ViewChild('card', { read: ElementRef }) card!: ElementRef;

  usuario: any = {};
  edit: boolean = false;
  delete: boolean = false;
  userBeforeChanges: any = {};

  constructor(private router: Router,public popoverController: PopoverController,private alertController: AlertController,private storage: StorageService) { }

ngOnInit() {
this.getUsers();
    }

async getUsers(){
    const currentUser = await this.storage.get('currentUser');
    this.usuario = currentUser;
    console.log("actuaaaaaaal",currentUser)
    if (currentUser) {
          this.usuario.user;
          this.usuario.dateOfBirth = this.usuario.dateOfBirth?.split('T')[0];
        }else{
           console.warn('No existe un usuario logueado en consola');
        }
}


  back() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  enable() {
    this.edit = true;
    this.userBeforeChanges = { ...this.usuario };
  }

async saveChanges() {

  let users = await this.storage.get('users') || [];

  const index = users.findIndex((u: any) => u.id === this.usuario.id);

  if (index !== -1) {
    users[index] = this.usuario;

    await this.storage.set('users', users);

    await this.storage.set('currentUser', this.usuario);

    console.log("Usuario actualizado con éxito");
    this.edit = false;
  } else {
    console.error("Usuario no encontrado en el storage");
  }
}
  exitEditMode() {
    this.usuario = { ...this.userBeforeChanges };
    this.edit = false;
  }


  //POP UP 
  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

     deleteAccount() {
        this.isOpen = false;
     this.presentAlert("Esta acción eliminará tu cuenta definitivamente, ¿Seguro que deseas continuar?");
    
  }



  //Alerta antes de eliminar cuenta 

    async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'CUIDADO😯!',
      message: msj,
       buttons: [
      {
        text: 'NO',
        role: 'cancel',
        handler: () => {
          console.log('Eliminación cancelada');
        }
      },
      {
        text: 'SI',
        handler: () => {
          this.confirmDelete();
        }
      }
    ]
  });

    await alert.present();
  }

 async confirmDelete() {
  await this.storage.clear();
  this.router.navigate(['/login']);
}


  }


