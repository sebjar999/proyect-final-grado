import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EditarRutaService } from './editar-ruta.service';

declare const google;

@Component({
  selector: 'app-editar-ruta',
  templateUrl: './editar-ruta.page.html',
  styleUrls: ['./editar-ruta.page.scss'],
})
export class EditarRutaPage implements OnInit {

  map: any;
  start = '';
  end = '';
  difi: any;
  timedate: Date;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private alertCtrl: AlertController,
    private editarRutaService: EditarRutaService
  ) {

  }
  ngOnInit(): void {
    this.initMap();
  }

  iniciar(form): void {
    this.editarRutaService.editarInformacionRuta(form).subscribe((response) => {
      if ((response.status === true)) {
        this.rutaActualizadafallo();
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function () { window.location.href = '/definir'; }, 1500);
      } else {
        this.rutaActualizadaExitosa();
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function () { window.location.href = '/definir'; }, 2000);
      }
    }, (error) => {
      console.log(error);
    });
  }
  async rutaActualizadaExitosa() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Ruta actualizada exitosamente',
      //subHeader: 'recuerda el compromiso que acabas de hacer'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async rutaActualizadafallo() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Error al editar la ruta',
      subHeader: 'Intenta de nuevo o intenta mas tarde'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  onSubmit() { }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: { lat: 4.81333, lng: -75.69611 },
    });
    console.log("entra");

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {

    const inicioruta = this.start + ',co';
    const finruta = this.end + ',co';
    const travel = 'DRIVING';

    this.directionsService.route({
      origin: inicioruta,
      destination: finruta,
      travelMode: travel
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        //this.falloCordenadas();
      }
    });
  }

  obtenerValuesEditRutaMaps() {
    const t = this.timedate.toString();
    const day = t.split('T')[0];
    const hour = t.split('T')[1].split('-')[0];
    const dayHour = day + ' ' + hour;

    const body = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      start_route: this.start + ',co',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      end_route: this.end + ',co',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      route_level: +this.difi,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      date_route: dayHour,

    };

    this.iniciar(body);
  }
}
