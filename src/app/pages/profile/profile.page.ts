import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(private apiService: ApiService, private router: Router,public popoverController: PopoverController,private alertController: AlertController) { }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId != null) {
      this.apiService.getUserById(userId).subscribe({
        next: (res) => {
          this.usuario = res.user;
          this.usuario.dateOfBirth = this.usuario.dateOfBirth?.split('T')[0];
          console.log('usuario:', this.usuario);
        },
        error: (err) => {
          console.error('Error al obtener usuario', err);
        }
      });
    }
  }

  back() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  enable() {
    this.edit = true;
    this.userBeforeChanges = { ...this.usuario };
  }

  saveChanges() {
    this.apiService.updateUser(this.usuario.id, this.usuario).subscribe({
      next: (res) => {
        console.log("Usuario actualizado con éxito");
        this.edit = false;
      },
      error: (err) => {
        console.error('Error al guardar cambios', err);
      }
    });
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

  confirmDelete() {
        const userId = localStorage.getItem('userId');
    if (userId != null) {
      this.apiService.deleteUser(userId).subscribe({
        next: (res) => {
           localStorage.removeItem('userId');
           this.router.navigate(['/login'], { replaceUrl: true });
          console.log('usuario eliminado');
        },
        error: (err) => {
          console.error('Error al obtener usuario', err);
        }
      });
    }


  }

}


