import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ListRuta } from './rutas-disponibles.model';

@Injectable({
    providedIn: 'root'
})
export class RutasDisponiblesService {
    url = environment.API_URL + 'route';
    constructor(private http: HttpClient) { }

    public mostrarRuta(){
        const segurityHeaders = new HttpHeaders({
         // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
         'Authorization': `token ${localStorage.getItem('token')}`,
         // eslint-disable-next-line @typescript-eslint/naming-convention
         'Content-Type': 'application/json; charset=utf-8',
       });
       return this.http.get(this.url,
         { headers: segurityHeaders });
     }
}
