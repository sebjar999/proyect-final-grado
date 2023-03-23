import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EditarUService {
  url = environment.API_URL + '';
  private segurityHeaders = new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  public actualizar(body: Record<string, string | number | any>) {
    return this.http.post<any>(this.url, body,
      { headers: this.segurityHeaders });
  }
}
