import { Component } from '@angular/core';
import { Loginservice } from '../../services/loginservice';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule, RouterModule, MatDividerModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  role: string = '';
  usuario: string = '';

  constructor(private loginService: Loginservice) {}

  cerrar() {
    sessionStorage.clear();
  }
  
 
  verificar() {
    this.role = this.loginService.showRole();

    return this.loginService.verificar();
  }
  isAdmin() {
    return this.role === 'ADMIN';
  }

  isUser() {
    return this.role === 'USUARIO';
  }
}
