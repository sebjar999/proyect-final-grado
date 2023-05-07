import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { Rutas } from './rutas-afiliadas.model';
import { Comentarios } from './rutas-afiliadas_comments.model';
import { RutasAfiliadasService } from './rutas-afiliadas.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-rutas-afiliadas',
  templateUrl: './rutas-afiliadas.page.html',
  styleUrls: ['./rutas-afiliadas.page.scss'],
})
export class RutasAfiliadasPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  comentPublicar: string;

  rutas: Rutas[] = [];
  comentarios: Comentarios[] = [];

  isModalOpen = false;

  constructor(
    private rutasAfiliadasService: RutasAfiliadasService,
    private alertCtrl: AlertController,
  ) { }

  setOpen(isOpen: boolean, id: string) {
    
     this.isModalOpen = isOpen;
    
     const params: HttpParams = new HttpParams().set('route_id', id);
     
     this.rutasAfiliadasService.comentarios(params)
      .subscribe((response) => {
      
        this.comentarios = response['comments'];
        console.log(response);

      }, (error) => {
        
        console.log(error);
      
      });
  }
  ngOnInit() {
    this.rutasAfiliadasService.rutasAfili().subscribe(data => {
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.rutas = data['routes'];
    });
  }
  enviarDatos(id: String) {
    console.log(id);

    const body = {
      id_route: id,
      comment: this.comentPublicar,
    };

    this.rutasAfiliadasService.enviar(body).subscribe(data => {
      if ((data === true)) {
        console.log(data);
        

      } else {
        console.log(data);
      }
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
