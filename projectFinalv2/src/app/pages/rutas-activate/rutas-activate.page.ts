import { Component, OnInit } from '@angular/core';
import { RutasActivateService } from './rutas-activate.service';
import { ListRutaActivate } from './rutas-activate.model';

@Component({
  selector: 'app-rutas-activate',
  templateUrl: './rutas-activate.page.html',
  styleUrls: ['./rutas-activate.page.scss'],
})
export class RutasActivatePage implements OnInit {

  listRutaActivate: ListRutaActivate[] = [];
  constructor(
    private rutasActivateService: RutasActivateService
  ) { }

  ngOnInit() {
    this.rutasActivateService.mostrarRutaActivate()
      .subscribe(data => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.listRutaActivate = data['routes'];
        console.log(data);
        
      });
  }

}
