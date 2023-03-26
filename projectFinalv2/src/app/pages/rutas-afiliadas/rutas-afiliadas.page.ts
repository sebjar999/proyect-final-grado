import { Component, OnInit } from '@angular/core';
import { Logs } from 'selenium-webdriver';
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
      console.log(data);
      
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.rutas = data['routes'];
      console.log(this.rutas);
      
    });

  }

  cancelar(body){
    this.rutasAfiliadasService.cancelar(body).subscribe((response)=>{
      if ((response === true)) {
        console.log(response);
      } else {
        console.log(response);
      }
    })
  }

}
