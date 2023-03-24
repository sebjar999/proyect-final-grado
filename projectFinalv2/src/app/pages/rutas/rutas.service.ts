import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
//mostrar rutas disponibles por los usuarios
export class RutasService {
  url = environment.API_URL + 'route_all';
  url_ = environment.API_URL + 'subscribe';
  constructor(private http: HttpClient) { }

  public rutasAll() {
    const segurityHeaders = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
      'Authorization': `token ${localStorage.getItem('token')}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.get(this.url,
      { headers: segurityHeaders });
  }
  public asistencia(body: Record<string, string | number | any>) {
    const segurityHeaders = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
      'Authorization': `token ${localStorage.getItem('token')}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.post(this.url_, body,
      { headers: segurityHeaders });
  }
}
