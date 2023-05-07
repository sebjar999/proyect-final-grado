import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class RutasAfiliadasService {
  url = environment.API_URL + 'subscribe';
  url2 = environment.API_URL + 'subscribe';
  url3 = environment.API_URL + 'comments';
  url4 = environment.API_URL + 'comments';

  constructor(private http: HttpClient) { }

  public rutasAfili() {
    const segurityHeaders = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
      'Authorization': `token ${localStorage.getItem('token')}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.get(this.url,
      { headers: segurityHeaders });
  }

  public cancelar(body: Record<string, string | number | any>) {
    const segurityHeaders = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
      'Authorization': `token ${localStorage.getItem('token')}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.delete(this.url2,
      { headers: segurityHeaders, body: body });
  }

  public comentarios(params: HttpParams): Observable<any> {
    const segurityHeaders = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
      'Authorization': `token ${localStorage.getItem('token')}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json; charset=utf-8',
    });

    return this.http.get(this.url3, { params, headers: segurityHeaders })

  }

  public enviar(body: Record<string, string | number | any>) {
    const segurityHeaders = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
      'Authorization': `token ${localStorage.getItem('token')}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.post(this.url4, body,
      { headers: segurityHeaders });
  }
}