import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Rutas } from './rutas-afiliadas.model';
import { RutasAfiliadasService } from './rutas-afiliadas.service';
@Component({
  selector: 'app-rutas-afiliadas',
  templateUrl: './rutas-afiliadas.page.html',
  styleUrls: ['./rutas-afiliadas.page.scss'],
})
export class RutasAfiliadasPage implements OnInit {

  rutas: Rutas[] = [];

  constructor(
    private rutasAfiliadasService: RutasAfiliadasService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.rutasAfiliadasService.rutasAfili().subscribe(data => {
      console.log(data);

      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.rutas = data['routes'];
      console.log(this.rutas);

    });

  }

  cancelar(iD: number) {

    const body = {
      route_id: iD
    };

    this.rutasAfiliadasService.cancelar(body)
      .subscribe((response) => {

        if ((response === true)) {
          console.log(response);
        } else {
          console.log(response);
        }

      })
  }

  async cancelacionCompleta() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Has cancelado tu subscribcion a esta ruta ',
      subHeader: 'Sera para la proxima.'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    
  }
  async cancelacionIncompleta() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Fallo al cancelar tu subscribcion a esta ruta',
      subHeader: 'intenta de nuevo o mas tarde.'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    
  }

}
