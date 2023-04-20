import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EditarRutaService } from './editar-ruta.service';
import { DatosRutas } from './edit-ruta-datos-model';
import { HttpParams } from '@angular/common/http';

declare const google;

@Component({
  selector: 'app-editar-ruta',
  templateUrl: './editar-ruta.page.html',
  styleUrls: ['./editar-ruta.page.scss'],
})
export class EditarRutaPage implements OnInit {
  datosRutas: DatosRutas[] = [];

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
    private editarRutaService: EditarRutaService,
  ) { }

  ngOnInit(): void {
    this.initMap();

    const id = JSON.parse(localStorage.getItem('idEdit'));
    console.log(id);
    const params:HttpParams = new HttpParams().set('id',id);
    this.editarRutaService.getDataRoute(params)
      .subscribe(data => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.datosRutas = data['routes'];
        console.log(data);
        
      });
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
        localStorage.removeItem('idEdit');
      }
    }, (error) => {
      console.log(error);
    });
  }
  async rutaActualizadaExitosa() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Ruta actualizada exitosamente',
      subHeader: 'Los otros usuarios ya pueden visualizarla, recuerda estar pendiente de tu ruta'
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
    const Id = JSON.parse(localStorage.getItem('idEdit'));
    const body = {
     
     id:Id,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      date_route: dayHour,

    };

    this.iniciar(body);
    
  }
}
