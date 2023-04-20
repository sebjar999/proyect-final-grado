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
  constructor(
    private rutasDisponiblesService: RutasDisponiblesService,
    private alertController: AlertController,
    public navCtrl: NavController
  ) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Gestion de la ruta',
      subHeader: 'Escoge',
      
      buttons: [
        {
          text: 'Informacion de la ruta',
          handler: () => {
            this.navCtrl.navigateRoot('definir');
          }
        },
        {
          text: 'Cancelar ruta',
          handler: () => {
            
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

