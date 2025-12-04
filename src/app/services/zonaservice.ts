import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Zona } from '../models/zona';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Zonaservice {
  private url = `${base_url}/zonas`;
  //para insertar
  private listaCambio = new Subject<Zona[]>();

  constructor(private http: HttpClient) {}

  //listar
  list() {
    return this.http.get<Zona[]>(`${this.url}/lista`);
  }

  //insertar
  insert(a: Zona) {
    return this.http.post(`${this.url}/nuevo`, a, { responseType: 'text' });
  }
  setList(listaNueva: Zona[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  //actualizar
  listId(id: number) {
    return this.http.get<Zona>(`${this.url}/${id}`);
  }
  update(a: Zona) {
    return this.http.put(`${this.url}/editar`, a, { responseType: 'text' });
  }

  //eliminar
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
