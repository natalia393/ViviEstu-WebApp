import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequestDTO } from '../models/jwtRequestDTO';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment'; // <--- Importa esto

@Injectable({
  providedIn: 'root',
})
export class Loginservice {
  
  // Usamos la URL base que definimos antes
  private url = ${environment.base}/login; 

  constructor(private http: HttpClient) {}

  login(request: JwtRequestDTO) {
    // Ahora apunta dinámicamente a Render (o localhost si estás en desarrollo)
    return this.http.post(this.url, request);
  }

  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null; 
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
}
