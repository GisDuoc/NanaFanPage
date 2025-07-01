import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { StorageService } from 'src/app/services/storage.service';
import { Storage } from '@ionic/storage-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  edadInvalida: boolean = false;
  
  data = {
  nombreCompleto: "",
  user: "",
  fechaNacimiento: "",
  correo: "",
  telefono: "",
  password: "",
  repeatPassword: ""
  }

  formulario: FormGroup | undefined;

  constructor(private fb: FormBuilder, private router: Router,private alertController: AlertController,private storage: StorageService, private db: DbService,private apiService: ApiService) { 
      this.formulario = this.fb.group({
      nombreCompleto: ['', Validators.required],
      user: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }
  async ngOnInit() {

  }

  logout() {
     this.router.navigate(['/']);
  }

async sendForm(formulario: any) {


 // Validación de edad
    const fechaNac = new Date(this.data.fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    const dia = hoy.getDate() - fechaNac.getDate();
    const mayorDe18 = edad > 18 || (edad === 18 && (mes > 0 || (mes === 0 && dia >= 0)));

    if (!mayorDe18) {
      this.edadInvalida = true;
      return;
    }

    if (formulario.invalid || this.data.password !== this.data.repeatPassword) {
      return;
    }

    const newUser = {
      name: formulario.value.nombreCompleto,
      user: formulario.value.user,
      dateOfBirth: formulario.value.fechaNacimiento,
      email: formulario.value.correo,
      phone: formulario.value.telefono,
      password: formulario.value.password,
    };
     
    //usar api para guardar el nuevo usuario
    this.apiService.createUser(newUser).subscribe({
    next: (response) => {
    const userId = response.user.id;
    localStorage.setItem('userId', userId.toString());
    console.log('Usuario creado en backend:', response);

      this.storage.get('users').then(users => {
        const usuarios = users || [];
        usuarios.push(newUser);
        this.storage.set('users', usuarios);
      });

      formulario.reset();
      this.router.navigate(['/login']);


       },
    error: (error) => {
      console.error('Error al crear usuario en backend', error);
    }
  });
   /* const users = (await this.storage.get('users')) || [];
    users.push({ ...this.data });
    await this.storage.set('users', users);

    console.log('Guardado en Storage:', users);

        this.data = {
      nombreCompleto: '',
      user: '',
      fechaNacimiento: '',
      correo: '',
      telefono: '',
      password: '',
      repeatPassword: ''
    };

    formulario.resetForm();
  } */
}
}