import { Component, OnInit, ViewChild } from '@angular/core';
import { RutasService } from './rutas.service';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { Rutas } from './rutas.model';
import { HttpParams } from '@angular/common/http';

//import { InfiniteScrollCustomEvent } from '@ionic/angular';

declare const google;

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
})
export class RutasPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  fechaSeleccionadainicio: string;
  fechaSeleccionadaFin: string;
  /* Rutas  */
  rutas: Rutas[] = [];
  /* Rutas filtradas por nivel  */
  rutasFilterOne: Rutas[] = [];
  rutasFilterTwo: Rutas[] = [];
  rutasFilterThree: Rutas[] = [];
  /* Rutas filtradas por fechas  */
  since: Rutas[] = [];

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
    private rutasService: RutasService

  ) { }
  filtrarPorFecha() {
    //inicio 
    const t = this.fechaSeleccionadainicio.toString();
    const day = t.split('T')[0];
    const hour = t.split('T')[1].split('-')[0];
    const dayHour = day + ' ' + hour;
    console.log('Fecha seleccionada:', dayHour);
    //fin 
    const tI = this.fechaSeleccionadaFin.toString();
    const dayI = tI.split('T')[0];
    const hourI = tI.split('T')[1].split('-')[0];
    const dayHourI = dayI + ' ' + hourI;
    console.log('Fecha seleccionada1:', dayHourI);

    let params = new HttpParams()
    .set('date_since', dayHour)
    .set('date_until', dayHourI);
    this.rutasService.rutasFilterDay(params).subscribe(data => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.since = data['msg'];
      console.log(data);
      console.log(this.since);
      
    });

  }

  ngOnInit() {
    this.rutasService.rutasAll().subscribe(data => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.rutas = data['routes'];
    });
    this.initMap();
    /* level one  */
    const paramsOne: HttpParams = new HttpParams().set('level_percentage', 1);
    this.rutasService.rutasFilter(paramsOne).subscribe(data => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.rutasFilterOne = data['routes'];
    });
    /* level two */
    const paramsTwo: HttpParams = new HttpParams().set('level_percentage', 2);
    this.rutasService.rutasFilter(paramsTwo).subscribe(data => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.rutasFilterTwo = data['routes'];
    });
    /* Level three */
    const paramsThree: HttpParams = new HttpParams().set('level_percentage', 3);
    this.rutasService.rutasFilter(paramsThree).subscribe(data => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.rutasFilterThree = data['routes'];
    });
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
          this.rutasService.rutasAll().subscribe(data => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            this.rutas = data['routes'];
            setTimeout(function () { window.location.href = '/rutas-afiliadas'; }, 1500);
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
}
