import { Component, OnInit } from '@angular/core';
import { Rutas } from './rutas-afiliadas.model';
import { RutasAfiliadasService } from './rutas-afiliadas.service';
@Component({
  selector: 'app-rutas-afiliadas',
  templateUrl: './rutas-afiliadas.page.html',
  styleUrls: ['./rutas-afiliadas.page.scss'],
})
export class RutasAfiliadasPage implements OnInit {

  rutas: Rutas[] = [];
  
  constructor(
    private rutasAfiliadasService: RutasAfiliadasService,
  ) { }

  ngOnInit() {
    this.rutasAfiliadasService.rutasAfili().subscribe(data => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.rutas = data['routes'];
    });

  }

}
