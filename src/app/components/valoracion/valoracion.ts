import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';
import { Valoracionlistar } from './valoracionlistar/valoracionlistar';

@Component({
  selector: 'app-valoracion',
  imports: [RouterModule, Menu, Valoracionlistar],
  templateUrl: './valoracion.html',
  styleUrl: './valoracion.css',
})
export class Valoracion {
  constructor(public route: ActivatedRoute){}
}
