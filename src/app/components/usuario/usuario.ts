import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';
import { Usuariolistar } from './usuariolistar/usuariolistar';

@Component({
  selector: 'app-usuario',
  imports: [RouterModule, Menu, Usuariolistar],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {
  constructor(public route: ActivatedRoute){}
}
