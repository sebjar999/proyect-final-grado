import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-caja-comentarios',
  templateUrl: './caja-comentarios.component.html',
  styleUrls: ['./caja-comentarios.component.scss'],
})
export class CajaComentariosComponent implements OnInit {

  comentarios: any[];
  nuevoComentario = {
    autor: '',
    mensaje: ''
  };
  constructor(private http: HttpClient) { }

  obtenerComentarios() {
    return this.http.get('https://api.comentarios.com/comentarios');
  }
  ngOnInit() {}

  publicarComentario() {
    this.http.post('https://api.comentarios.com/comentarios', this.nuevoComentario).subscribe(() => {
      this.obtenerComentarios().subscribe((comentarios: any[]) => {
        this.comentarios = comentarios;
        this.nuevoComentario = {
          autor: '',
          mensaje: ''
        };
      });
    });
  }
}
