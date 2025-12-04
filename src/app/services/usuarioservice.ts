import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
  private url = `${base_url}/usuarios`;
  //para insertar
  private listaCambio = new Subject<Usuario[]>();

  constructor(private http: HttpClient) {}

  //listar
  list() {
    return this.http.get<Usuario[]>(`${this.url}/listas`);
  }

  //insertar
  insert(a: any) {
    return this.http.post(`${this.url}/registro`, a, { responseType: 'text' });
  }
  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  //actualizar
  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }
  update(a: Usuario) {
    return this.http.put(`${this.url}/editar`, a, { responseType: 'text' });
  }

  //eliminar
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
