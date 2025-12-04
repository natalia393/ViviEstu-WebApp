import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Simuladorgasto } from '../models/simuladorgasto';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Simuladorgastoservice {
  private url = `${base_url}/simulador`;
  //para insertar
  private listaCambio = new Subject<Simuladorgasto[]>();

  constructor(private http: HttpClient) {}

  //listar
  list() {
    return this.http.get<Simuladorgasto[]>(`${this.url}/lista`);
  }

  //insertar
  insert(a: Simuladorgasto) {
    return this.http.post(`${this.url}/nuevo`, a, { responseType: 'text' });
  }
  setList(listaNueva: Simuladorgasto[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  //actualizar
  listId(id: number) {
    return this.http.get<Simuladorgasto>(`${this.url}/${id}`);
  }
  update(a: Simuladorgasto) {
    return this.http.put(`${this.url}/editar`, a, { responseType: 'text' });
  }

  //eliminar
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
