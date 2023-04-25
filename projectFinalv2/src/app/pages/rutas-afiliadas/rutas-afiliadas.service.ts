import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })

  export class RutasAfiliadasService {
    url = environment.API_URL + 'subscribe';
    url2 = environment.API_URL + 'subscribe';
    url3 = environment.API_URL + 'comments';

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
    public comentarios(body: Record<string, string | number | any>) {
      const segurityHeaders = new HttpHeaders({
          // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
          'Authorization': `token ${localStorage.getItem('token')}`,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json; charset=utf-8',
        });
        return this.http.post(this.url3, body,
          { headers: segurityHeaders });
      }
  }