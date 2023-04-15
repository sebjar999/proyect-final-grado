import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditarRutaService {

  url = environment.API_URL + 'route';
  url1 = environment.API_URL + '';

  constructor(private http: HttpClient) { }

  public editarInformacionRuta(body: Record<string, string | number | any>) {
    const segurityHeaders = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
      'Authorization': `token ${localStorage.getItem('token')}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.patch<any>(this.url, body,
      { headers: segurityHeaders });
  }
  public mostrarDatos(body: Record<string, string | number | any>) {
    const segurityHeaders = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
      'Authorization': `token ${localStorage.getItem('token')}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.post<any>(this.url, body,
      { headers: segurityHeaders });
  }
}
