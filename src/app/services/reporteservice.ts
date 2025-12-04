import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Reporte } from '../models/reporte';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Reporteservice {
  private url = `${base_url}/reportes`;
  //para insertar
  private listaCambio = new Subject<Reporte[]>();

  constructor(private http: HttpClient) {}

  //listar
  list() {
    return this.http.get<Reporte[]>(`${this.url}/lista`);
  }

  //insertar
  insert(a: Reporte) {
    return this.http.post(`${this.url}/nuevo`, a, { responseType: 'text' });
  }
  setList(listaNueva: Reporte[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  //actualizar
  listId(id: number) {
    return this.http.get<Reporte>(`${this.url}/${id}`);
  }
  update(a: Reporte) {
    return this.http.put(`${this.url}/editar`, a, { responseType: 'text' });
  }

  //eliminar
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
