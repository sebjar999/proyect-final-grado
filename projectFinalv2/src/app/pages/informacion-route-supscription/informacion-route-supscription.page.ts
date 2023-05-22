import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { InfoRoute } from './informacion-route-supscription.model';
import { InformacionRouteService } from './informacion-route-supscription.service';

@Component({
  selector: 'app-informacion-route-supscription',
  templateUrl: './informacion-route-supscription.page.html',
  styleUrls: ['./informacion-route-supscription.page.scss'],
})
export class InformacionRouteSupscriptionPage implements OnInit {
  infoRoute: InfoRoute[]=[];
  num= 0;
  constructor(
    private informacionRouteService:InformacionRouteService
  ) { }

  ngOnInit() {
    const id = JSON.parse(localStorage.getItem('idInfo'));
    console.log(id);
    
    const params: HttpParams = new HttpParams().set('route_id', id);
    this.informacionRouteService.informacionRoute(params)
      .subscribe(data => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.infoRoute = data['users'];
       console.log(data);
       
      });
  }

}
