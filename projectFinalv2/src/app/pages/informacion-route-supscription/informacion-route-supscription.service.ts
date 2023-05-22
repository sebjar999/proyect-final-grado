import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
//mostrar rutas disponibles por los usuarios
export class InformacionRouteService {
    url = environment.API_URL + 'usersByroutes';

    constructor(private http: HttpClient) { }

    public informacionRoute(params: HttpParams): Observable<any> {
        const segurityHeaders = new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
            'Authorization': `token ${localStorage.getItem('token')}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json; charset=utf-8',
        });
        return this.http.get(this.url, { params, headers: segurityHeaders });
    }

}
