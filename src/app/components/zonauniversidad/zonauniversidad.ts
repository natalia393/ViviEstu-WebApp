import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';
import { Zonauniversidadlistar } from './zonauniversidadlistar/zonauniversidadlistar';

@Component({
  selector: 'app-zonauniversidad',
  imports: [RouterModule, Menu, Zonauniversidadlistar],
  templateUrl: './zonauniversidad.html',
  styleUrl: './zonauniversidad.css',
})
export class Zonauniversidad {
  constructor(public route: ActivatedRoute){}
}
