import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IniciarSeccionService } from './iniciar-seccion.service';

//import { BicycleService } from '../../services/bicycle.service';
//import { AuthService } from '../../services/api_http_registrar';
@Component({
  selector: 'app-iniciar-seccion',
  templateUrl: './iniciar-seccion.page.html',
  styleUrls: ['./iniciar-seccion.page.scss'],
})
export class IniciarSeccionPage implements OnInit {
  formlogin: FormGroup;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private alertCtrl: AlertController,
    private fbb: FormBuilder,
    private iniciarSeccionService: IniciarSeccionService,
    public navCtrl: NavController
  ) {
    this.formlogin = this.fbb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  iniciar(form): void {
    this.iniciarSeccionService.iniciarSesion(form)
      .subscribe((res) => {
        this.bienvenidologin();
        
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        //setTimeout(function() { window.location.href = '/definir'; }, 1000);
        localStorage.setItem('token', res.token);
        localStorage.setItem('ingresado', 'true');
        this.navCtrl.navigateRoot('definir');
      }, (err) => {
        this.fallologin();
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function() { window.location.href = '/inicio'; }, 1500);
      });
    /*  this.authService.validarLoginApp(form).subscribe((response) => {
       if ((response.status === true)) {
         this.bienvenidologin();
         // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
         setTimeout(function() { window.location.href = '/definir'; }, 1000);
         console.log(response);
         localStorage.setItem('email', response.data[0].email);
       }else{
         this.fallologin();
         localStorage.removeItem('id');
          // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
          setTimeout(function() { window.location.href = '/inicio'; }, 1500);
       }
         }, (error) => {
       console.log(error);
     });
     // */
  }

  async bienvenidologin() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Bienvenido de nuevo bike interaction',
      subHeader: 'Es bueno volverte a ver'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async fallologin() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Error al ingresar a bike interaction',
      subHeader: 'Intenta de nuevo'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  onSubmit() {
    const body = {
      email: this.formlogin.get('email').value,
      password: this.formlogin.get('password').value,
    };

    this.iniciar(body);
    /*  const body = {
      email: this.formlogin.get('email').value,
      password: this.formlogin.get('password').value,
    };
    this.iniciar(body);
  } */
  }
}
