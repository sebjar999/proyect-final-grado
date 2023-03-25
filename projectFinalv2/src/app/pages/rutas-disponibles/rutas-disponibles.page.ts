import { Component, OnInit } from '@angular/core';
import { RutasDisponiblesService } from './rutas-disponibles.service';
import { ListRuta } from './rutas-disponibles.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-rutas-disponibles',
  templateUrl: './rutas-disponibles.page.html',
  styleUrls: ['./rutas-disponibles.page.scss'],
})
export class RutasDisponiblesPage implements OnInit {
  listRuta: ListRuta[] = [];
  constructor(
    private rutasDisponiblesService: RutasDisponiblesService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.rutasDisponiblesService.mostrarRuta()
    .subscribe(data => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.listRuta = data['routes'];

    });
    }

  }
