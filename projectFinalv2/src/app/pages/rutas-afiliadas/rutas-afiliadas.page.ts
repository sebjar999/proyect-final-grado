import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { Rutas } from './rutas-afiliadas.model';
import { Comentarios } from './rutas-afiliadas_comments.model';
import { RutasAfiliadasService } from './rutas-afiliadas.service';
import { OverlayEventDetail } from '@ionic/core/components'; 

@Component({
  selector: 'app-rutas-afiliadas',
  templateUrl: './rutas-afiliadas.page.html',
  styleUrls: ['./rutas-afiliadas.page.scss'],
})
export class RutasAfiliadasPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  comentPublicar: string;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  rutas: Rutas[] = [];
  comentarios: Comentarios[] = [];

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  constructor(
    private rutasAfiliadasService: RutasAfiliadasService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.rutasAfiliadasService.rutasAfili().subscribe(data => {
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.rutas = data['routes'];

    });
  }
commentsRutas(id: string){

  const body = {
    route_id: id
  };
  this.rutasAfiliadasService.comentarios(body)
  .subscribe((response) => {
    this.comentarios = response['comments'];
    console.log(response);

    
  }, (error) => {
    console.log(error);
  });


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
