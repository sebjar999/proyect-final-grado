import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditarUService } from './editar-cuenta.service';
import { DatosUser } from './editar-cuenta.model';


@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.page.html',
  styleUrls: ['./editar-cuenta.page.scss'],
})
export class EditarCuentaPage implements OnInit {
  formActualizar: FormGroup;
  datosUser: DatosUser[] = [];
  get actualizarF() { return this.formActualizar.controls; }
  full_name_holder: string;
  last_name_holder: string;
  email_holder: string;
  password_holder: string;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private editarUService: EditarUService
  ) {
    this.formActualizar = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
    });
   }

  ngOnInit() {
    const to = JSON.parse(localStorage.getItem(''));
    
    this.editarUService.getDataUser()
      .subscribe(data => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
       this.datosUser = data['users'];
       
       this.full_name_holder = this.datosUser['full_name'];
       this.last_name_holder =  this.datosUser['last_name'];
       this.email_holder =  this.datosUser['email'];
       this.password_holder =  this.datosUser['password'];
      });
      
  }

  editar(form): void {

    this.editarUService.actualizar(form)
    .subscribe((response) => {
      this.actualizacionexitosa();
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      setTimeout(function() { window.location.href = '/definir'; }, 1500);
    },(err) =>{
      this.actualizacionfallido();
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      setTimeout(function() { window.location.href = '/inicio'; }, 1500);
    });

    //
  }

  async actualizacionexitosa() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Exito al actualizar tus datos de usuario'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async actualizacionfallido() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Fallo al actualzar tus datos de usuario',
      subHeader: 'Intentalo mas tarde'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  onSubmit() {
    const body = {
      full_name: this.formActualizar.get('name').value,
      last_name: this.formActualizar.get('lastname').value,
      password: this.formActualizar.get('password').value,
    };

    this.editar(body);

  }
}
