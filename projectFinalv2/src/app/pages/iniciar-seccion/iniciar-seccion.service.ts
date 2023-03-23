import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IniciarSeccionService {
  url = environment.API_URL + 'login';
  private segurityHeaders = new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json; charset=utf-8',
  });
  constructor(private http: HttpClient) { }
  public iniciarSesion(body: Record<string, string | number | any>) {
    return this.http.post<any>(this.url, body,
        { headers: this.segurityHeaders });
}
}
