import { Component, OnInit, ViewChild } from '@angular/core';
import { RutasService } from './rutas.service';
import { AlertController, IonModal } from '@ionic/angular';
import { Rutas } from './rutas.model';
import { OverlayEventDetail } from '@ionic/core/components';

declare const google;

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
})
export class RutasPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  rutas: Rutas[] = [];
  token1: string;
  id1: any;
  id: any;
  name: string;
  isModalOpen = false;
  map: any;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor(
    private alertCtrl: AlertController,
    private rutasService: RutasService,
    private alertController: AlertController,
    //private asistirRutasDisponibles: AsistirRutasDisponibles
  ) { }

  ngOnInit() {
    this.rutasService.rutasAll().subscribe(data => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.rutas = data['routes'];
    });

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

  asistir(iD: number) {
   const token=localStorage.token
    
   const body = {
      token: token,
      route_id: iD
    };

    
    
    this.rutasService.asistencia(body)
      .subscribe((response) => {
        console.log("entra");

        if ((response === true)) {
          this.asistenciaCompleta();          
        } else {
          this.asistenciaIncompleta();
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
}
