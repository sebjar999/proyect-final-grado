import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BicycleService } from '../../services/bicycle.service';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/api_http_registrar';
import { ConfigPersonService } from './config-person.service';

@Component({
  selector: 'app-config-person',
  templateUrl: './config-person.page.html',
  styleUrls: ['./config-person.page.scss'],
})
export class ConfigPersonPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private configPersonService: ConfigPersonService,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  eliminar(): void {

    const token = localStorage.token; //Id almacenado en el localStorage

    this.configPersonService.deleteUsuario()
      .subscribe((response) => {
        this.eliminartrue();
         // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function() { window.location.href = '/inicio'; }, 1000);
        localStorage.removeItem('token');
      }, (error) => {
        this.eliminarfalse();
        setTimeout(function() { window.location.href = '/config-person'; }, 1500);
      });
    
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('ingresado');
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    setTimeout(function () { window.location.href = '/inicio'; }, 1000);
  }

  async eliminartrue() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Usuario eliminado',
      subHeader: 'Que mal que ya no estes con nosotros.'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async eliminarfalse() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Fallo al eliminar el usuario',
      subHeader: 'Intenta de nuevo'

    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
