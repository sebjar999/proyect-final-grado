import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrearRutaService {

  url = environment.API_URL + 'route';
  constructor(private http: HttpClient) { }

  public guardarInformacionRuta(body: Record<string, string | number | any>){
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
