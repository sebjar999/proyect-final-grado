import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RutasDisponiblesService {
    url = environment.API_URL + 'route';
    url1 = environment.API_URL + 'route';//falta
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
    public cancelarRuta(body: Record<string, string | number | any>){
        const segurityHeaders = new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
            'Authorization': `token ${localStorage.getItem('token')}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json; charset=utf-8',
          });
          return this.http.delete(this.url1,
            { headers: segurityHeaders,body: body  });
    }
}
