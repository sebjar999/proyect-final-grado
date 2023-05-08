import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RutasActivateService {
    url = environment.API_URL + 'get_routes_activated';
    
    constructor(private http: HttpClient) { }

    public mostrarRutaActivate (){
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