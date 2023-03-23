import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

//mostrar rutas disponibles por los usuarios
export class ConfigPersonService {
    url = environment.API_URL + 'delete/user';
    constructor(private http: HttpClient) { }

    public deleteUsuario(){
        const segurityHeaders = new HttpHeaders({
         // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
         'Authorization': `token ${localStorage.getItem('token')}`,
         // eslint-disable-next-line @typescript-eslint/naming-convention
         'Content-Type': 'application/json; charset=utf-8',
       });
       return this.http.post(this.url,
         { headers: segurityHeaders });
     }
}
