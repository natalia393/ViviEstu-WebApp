import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Zonauniversidad } from '../models/zonauniversidad';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Zonauniversidadservice {
  private url = `${base_url}/zona-universidad`;
  //para insertar
  private listaCambio = new Subject<Zonauniversidad[]>();

  constructor(private http: HttpClient) {}

  //listar
  list() {
    return this.http.get<Zonauniversidad[]>(`${this.url}/lista`);
  }

  //insertar
  insert(a: Zonauniversidad) {
    return this.http.post(`${this.url}/nuevo`, a, { responseType: 'text' });
  }
  setList(listaNueva: Zonauniversidad[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  //actualizar
  listId(id: number) {
    return this.http.get<Zonauniversidad>(`${this.url}/${id}`);
  }
  update(a: Zonauniversidad) {
    return this.http.put(`${this.url}/editar`, a, { responseType: 'text' });
  }

  //eliminar
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
