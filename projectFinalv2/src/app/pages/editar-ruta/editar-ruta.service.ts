import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditarRutaService {

  url = environment.API_URL + 'route';
  url1 = environment.API_URL + 'get_route_to_edit';

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
  public getDataRoute(params:HttpParams): Observable<any>{
    const segurityHeaders = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention, quote-props
      'Authorization': `token ${localStorage.getItem('token')}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.get(this.url1, { params,headers: segurityHeaders})
  }
}
