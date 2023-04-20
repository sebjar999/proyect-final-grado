import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Rutas } from './rutas-afiliadas.model';
import { Comentarios } from './rutas-afiliadas_comments.model';
import { RutasAfiliadasService } from './rutas-afiliadas.service';
@Component({
  selector: 'app-rutas-afiliadas',
  templateUrl: './rutas-afiliadas.page.html',
  styleUrls: ['./rutas-afiliadas.page.scss'],
})
export class RutasAfiliadasPage implements OnInit {

  rutas: Rutas[] = [];
  comentarios: Comentarios[] = [];

  constructor(
    private rutasAfiliadasService: RutasAfiliadasService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.rutasAfiliadasService.rutasAfili().subscribe(data => {
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.rutas = data['routes'];
      let mensaje = '';

      for (const key in this.rutas) {
        if (this.rutas.hasOwnProperty(key)) {
          mensaje += `${key}: ${this.rutas[key]}<br>`;
        }
      }

    });
  }

  async comments(iD: string) {

    const body = {
      route_id: iD
    };

    this.rutasAfiliadasService.comentarios(body)
      .subscribe((response) => {
        this.comentarios = response['comments'];
        console.log(response);

      }, (error) => {
        console.log(error);
      });

    let mensaje = '';

    for (const key in this.rutas) {
      if (this.rutas.hasOwnProperty(key)) {
        mensaje += `${key}: ${this.rutas[key]}<br>`;
      }
    }
    const alert = await this.alertCtrl.create({

      header: 'Agregar comentario',
      message: mensaje,

      inputs: [
        {
          name: 'comment',
          type: 'textarea',
          placeholder: 'Escribe un comentario...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'Publicar',
          handler: (data) => {
            console.log('Comentario publicado:', data.comment);
          }
        }
      ]


    });

    await alert.present();
  }

  cancelar(iD: string) {

    const body = {
      route_id: iD
    };

    this.rutasAfiliadasService.cancelar(body)
      .subscribe((response) => {

        if ((response === true)) {
          this.cancelacionIncompleta();
        } else {
          this.cancelacionCompleta();
          this.rutasAfiliadasService.rutasAfili().subscribe(data => {
            console.log(data);

            // eslint-disable-next-line @typescript-eslint/dot-notation
            this.rutas = data['routes'];
            console.log(this.rutas);

          });
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
