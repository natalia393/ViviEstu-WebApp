import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Favorito } from '../models/favorito';
import { Zona } from '../models/zona';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Favoritoservice {
  private url = `${base_url}/favoritos`;

  constructor(private http: HttpClient) {}

  // ⭐ LISTAR FAVORITOS (GLOBAL)
  listarFavoritos() {
    return this.http.get<Zona[]>(`${this.url}/lista`);
  }

  // ⭐ AGREGAR FAVORITO
  agregarFavorito(dto: any) {
    return this.http.post(`${this.url}/nuevo`, dto);
  }

  // ⭐ ELIMINAR FAVORITO
  eliminarFavorito(idFavorito: number) {
    return this.http.delete(`${this.url}/${idFavorito}`);
  }
}
