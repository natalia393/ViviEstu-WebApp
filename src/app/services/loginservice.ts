import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequestDTO } from '../models/jwtRequestDTO';
import { JwtHelperService } from '@auth0/angular-jwt';
// Asegúrate de que la ruta a environment sea correcta
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root',
})
export class Loginservice {
  
  // Usamos la variable de entorno para la URL
  private url = ${environment.base}/login;

  constructor(private http: HttpClient) {}

  login(request: JwtRequestDTO) {
    // Apunta dinámicamente a Render o Localhost según el entorno
    return this.http.post(this.url, request);
  }

  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole() {
    let token = sessionStorage.getItem('token');
    
    // Si no hay token, devolvemos null inmediatamente
    if (!token) {
      return null; 
    }

    const helper = new JwtHelperService();
    
    // CORRECCIÓN AQUÍ:
    // Agregamos el signo de exclamación (!) al final de 'token'
    // Esto fuerza a TypeScript a entender que el token NO es null
    const decodedToken = helper.decodeToken(token!); 
    
    return decodedToken?.role;
  }
}
