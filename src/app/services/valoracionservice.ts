import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Valoracion } from '../models/valoracion';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Valoracionservice {
  private url = `${base_url}/valoraciones`;
  //para insertar
  private listaCambio = new Subject<Valoracion[]>();

  constructor(private http: HttpClient) {}

  //listar
  list() {
    return this.http.get<Valoracion[]>(`${this.url}/lista`);
  }

  //insertar
  insert(a: Valoracion) {
    return this.http.post(`${this.url}/nuevo`, a, { responseType: 'text' });
  }
  setList(listaNueva: Valoracion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  //actualizar
  listId(id: number) {
    return this.http.get<Valoracion>(`${this.url}/${id}`);
  }
  update(a: Valoracion) {
    return this.http.put(`${this.url}/editar`, a, { responseType: 'text' });
  }

  //eliminar
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
