import { Component, OnInit } from '@angular/core';
import { RutasDisponiblesService } from './rutas-disponibles.service';
import { ListRuta } from './rutas-disponibles.model';
import { AlertController, NavController } from '@ionic/angular';

/* AlertController 
import { NavParams } from '@ionic/angular'; */

@Component({
  selector: 'app-rutas-disponibles',
  templateUrl: './rutas-disponibles.page.html',
  styleUrls: ['./rutas-disponibles.page.scss'],

})
export class RutasDisponiblesPage implements OnInit {
  listRuta: ListRuta[] = [];
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  constructor(
    private rutasDisponiblesService: RutasDisponiblesService,
    private alertController: AlertController,
    public navCtrl: NavController
  ) { }


  async gestionRuta(id: string) {

    const alert = await this.alertController.create({
      header: 'Gestion de la ruta',

      buttons: [
        {
          text: 'Informacion de la ruta',
          handler: () => {
            console.log(id)
            localStorage.setItem('idInfo', id);
            setTimeout(function () { window.location.href = '/informacion-route-supscription'; }, 800);
          }
        },
        {
          text: 'Cancelar ruta',
          handler: () => {
            console.log(id);
            const body = {
              route_id: id
            };
            this.rutasDisponiblesService.cancelarRuta(body)
              .subscribe((response) => {
                if ((response === true)) {
                  console.log(response);
                } else {
                  console.log(response);
                }
              })
          }
        }
      ]

    });

    await alert.present();
  }

  ngOnInit() {
    this.rutasDisponiblesService.mostrarRuta()
      .subscribe(data => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.listRuta = data['routes'];
      });
  }

  enviarEditar(param1: string) {
    console.log(param1)
    localStorage.setItem('idEdit', param1);
    setTimeout(function () { window.location.href = '/editar-ruta'; }, 1000);
  }

}

