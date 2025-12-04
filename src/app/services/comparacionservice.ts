import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Comparacion } from '../models/comparacion';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Comparacionservice {
  private url = `${base_url}/comparaciones`;
  //para insertar
  private listaCambio = new Subject<Comparacion[]>();

  constructor(private http: HttpClient) {}

  //listar
  list() {
    return this.http.get<Comparacion[]>(`${this.url}/lista`);
  }

  //insertar
  insert(a: Comparacion) {
    return this.http.post<Comparacion>(`${this.url}/nuevo`, a);
  }
  setList(listaNueva: Comparacion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  //actualizar
  listId(id: number) {
    return this.http.get<Comparacion>(`${this.url}/${id}`);
  }
  update(a: Comparacion) {
    return this.http.put(`${this.url}/editar`, a, { responseType: 'text' });
  }

  //eliminar
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
