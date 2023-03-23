import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CrearRutaService } from './crear-ruta.service';

declare const google;

@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.page.html',
  styleUrls: ['./crear-ruta.page.scss'],
})

export class CrearRutaPage implements OnInit {
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
    private crearRutaService: CrearRutaService
  ) {

    /*   this.formRutas = this.fb.group({
        start: ['', [Validators.required]],
        end: ['', [Validators.required]],
        fecha: ['', [Validators.required]],
        hora: ['', [Validators.required]],
        nivel: ['', [Validators.required]],
      }); */
  }

  ngOnInit(): void {
    this.initMap();
  }

  iniciar(form): void {
    this.crearRutaService.guardarInformacionRuta(form)
    .subscribe((response) => {
      if ((response.status === true)) {
        this.rutafallo();
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function() { window.location.href = '/definir'; }, 1500);
      } else {
        this.rutaExitosa();
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        setTimeout(function() { window.location.href = '/definir'; }, 2000);
      }
    }, (error) => {
      console.log(error);
    });
  }
  async rutaExitosa() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Ruta creada exitosamente',
      subHeader: 'recuerda el compromiso que acabas de hacer'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async rutafallo() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Error al crear una nueva ruta',
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
        this.falloCordenadas();
      }
    });
  }
  async falloCordenadas() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Error al ingresar datos',
      subHeader: 'Digita correctamente los puntos de inicio y fin'
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  obtenerValuesRutaMaps() {

    const t = this.timedate.toString();
    const day = t.split('T')[0];
    const hour= t.split('T')[1].split('-')[0];
    const dayHour=day+ ' ' + hour;

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
