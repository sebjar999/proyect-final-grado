import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface InfoUsuarios {
    name: string;
    lastname: string;
    email: string;
    password: string;
}

interface Credenciales {
    email: string;
    password: string;
}

interface IdPerson {
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    url = 'http://localhost/Api/public/';

    private segurityHeaders: HttpHeaders;

    constructor(private http: HttpClient) { }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public GuardarInformacionUsuario(obj: InfoUsuarios) {

        this.segurityHeaders = new HttpHeaders({
            'Accept': '*/*',
            'Content-Type': 'application/json; charset=utf-8',
        });

        return this.http.post<any>(this.url + 'register_user', obj,
            { headers: this.segurityHeaders });
    }

    public validarLoginApp(data: Credenciales) {
        this.segurityHeaders = new HttpHeaders({
            'Accept': '*/*',
            'Content-Type': 'application/json; charset=utf-8',
        });
        return this.http.post<any>(this.url + 'iniciar_sesion', data,
            { headers: this.segurityHeaders }
        );
    }

    public eliminarUsuario(data: IdPerson) {
        const  emailData = ({email:data});
        this.segurityHeaders = new HttpHeaders({
            'Accept': '*/*',
            'Content-Type': 'application/json; charset=utf-8',
        });
        console.log(data);
        return this.http.post<any>(this.url + 'eliminar_cuenta',emailData,
            { headers: this.segurityHeaders }
        );
    }

    public actualizarUsuario(obj: InfoUsuarios) {
        this.segurityHeaders = new HttpHeaders({
            'Accept': '*/*|',
            'Content-Type': 'application/json; charset=utf-8',
        });
        return this.http.post<any>(this.url + `actualizar_usuario`,obj,
            { headers: this.segurityHeaders }
        );
    }

}
