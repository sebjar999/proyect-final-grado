import { Component,  ViewChild, ElementRef, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EditarRutaService } from './editar-ruta.service';

declare const google;

@Component({
  selector: 'app-editar-ruta',
  templateUrl: './editar-ruta.page.html',
  styleUrls: ['./editar-ruta.page.scss'],
})
export class EditarRutaPage implements OnInit {

  map1: any;
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
    this.initMaps();
  }

  iniciar(form): void {
    this.editarRutaService.editarInformacionRuta(form).subscribe((response) => {
      if ((response.status === true)) {
        this.rutaActualizadafallo();
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function() { window.location.href = '/definir'; }, 1500);
      } else {
        this.rutaActualizadaExitosa();
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function() { window.location.href = '/definir'; }, 2000);
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

  initMaps() {
    this.map1 = new google.maps.Map(document.getElementById('map1'), {
      zoom: 12,
      center: { lat: 4.81333, lng: -75.69611 },
    });

    this.directionsDisplay.setMap(this.map1);
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

  }

}
