import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comparaciondetalle } from '../models/comparaciondetalle';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Comparaciondetalleservice {
  private url = `${base_url}/comparacion-detalle`;
  //para insertar
  private listaCambio = new Subject<Comparaciondetalle[]>();

  constructor(private http: HttpClient) {}

  //listar
  list() {
    return this.http.get<Comparaciondetalle[]>(`${this.url}/lista`);
  }

  //insertar
  insert(a: Comparaciondetalle) {
    return this.http.post(`${this.url}/nuevo`, a, { responseType: 'text' });
  }
  setList(listaNueva: Comparaciondetalle[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  //actualizar
  listId(id: number) {
    return this.http.get<Comparaciondetalle>(`${this.url}/${id}`);
  }
  update(a: Comparaciondetalle) {
    return this.http.put(`${this.url}/editar`, a, { responseType: 'text' });
  }

  //eliminar
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
