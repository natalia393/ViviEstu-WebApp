import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Roleservice {
  private url = `${base_url}/roles`;
  //para insertar
  private listaCambio = new Subject<Role[]>();

  constructor(private http: HttpClient) {}

  //listar
  list() {
    return this.http.get<Role[]>(`${this.url}/listas`);
  }

  //insertar
  insert(a: Role) {
    return this.http.post(`${this.url}/nuevo`, a, { responseType: 'text' });
  }
  setList(listaNueva: Role[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  //actualizar
  listId(id: number) {
    return this.http.get<Role>(`${this.url}/${id}`);
  }
  update(a: Role) {
    return this.http.put(`${this.url}/editar`, a, { responseType: 'text' });
  }

  //eliminar
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
