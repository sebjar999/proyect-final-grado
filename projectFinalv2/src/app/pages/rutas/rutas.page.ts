import { Component, OnInit, ViewChild } from '@angular/core';
import { RutasService } from './rutas.service';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { Rutas } from './rutas.model';
import { Comentarios } from './rutasComents.model';

//import { Modal2Component } from 'src/app/components/modal2/modal2.component';

//import { InfiniteScrollCustomEvent } from '@ionic/angular';

declare const google;

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
})
export class RutasPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  rutas: Rutas[] = [];
  comentarios: Comentarios[] = [];
  token1: string;
  id1: any;
  id: any;
  name: string;
  isModalOpen = false;
  map: any;
  isAlertOpen = false;

  public alertButtons = ['OK'];

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor(
    private alertCtrl: AlertController,
    private rutasService: RutasService,
    private alertController: AlertController,
    //private modalController: ModalController
    //private asistirRutasDisponibles: AsistirRutasDisponibles
  ) { }

  ngOnInit() {
    this.rutasService.rutasAll().subscribe(data => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.rutas = data['routes'];
      console.log(this.rutas);

    });
    /*     onIonInfinite(ev) {
          
          setTimeout(() => {
            (ev as InfiniteScrollCustomEvent).target.complete();
          }, 500);
        }  */
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('rutaTrazada'), {
      zoom: 12,
      center: { lat: 4.81333, lng: -75.69611 }
    });

    this.directionsDisplay.setMap(this.map);
  }

  trazarRutaMaps(start, end) {

    const travel = 'DRIVING';

    this.directionsService.route({
      origin: start,
      destination: end,
      travelMode: travel
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      }
    });
  }

  setOpen(isOpen: boolean) {
    this.modal.isOpen = isOpen;
    this.initMap();
  }
  allComments(iD: number) {

    const body = {
      route_id: iD
    };

    this.rutasService.comentarios(body)
      .subscribe((response) => {
        if ((response === true)) {
          console.log(response);

        } else {
          console.log(response);
        }

      }, (error) => {
        console.log(error);
      });
      
  }
  asistir(iD: number) {

    const body = {
      route_id: iD
    };

    this.rutasService.asistencia(body)
      .subscribe((response) => {


        if ((response === true)) {
          this.asistenciaIncompleta();
        } else {
          this.asistenciaCompleta();
          this.rutasService.rutasAll().subscribe(data => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            this.rutas = data['routes'];
            console.log(this.rutas);
          });
        }

      }, (error) => {
        console.log(error);
      });
  }


  async asistenciaCompleta() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Felicitaciones te has suscrito a esta ruta ',
      subHeader: 'recuerda el compromiso que acabas de hacer'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async asistenciaIncompleta() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'fallo en la asistencia',
      subHeader: 'intenta de nuevo'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async comments() {
    const alert = await this.alertController.create({
      header: 'Comentarios',
      inputs: [
        {
          placeholder: 'Agrega un comentario...',
        },
      ],
    });

    await alert.present();
  }
  /* 
    comment() {
      this.modal2();
    } */
  /*   async modal2() {
      const modal2 = await this.modalController.create({
        component: Modal2Component
      });
      await modal2.present
    } */
}
