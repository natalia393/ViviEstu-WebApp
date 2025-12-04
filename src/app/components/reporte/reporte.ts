import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';
import { Reportelistar } from './reportelistar/reportelistar';

@Component({
  selector: 'app-reporte',
  imports: [RouterModule, Menu, Reportelistar],
  templateUrl: './reporte.html',
  styleUrl: './reporte.css',
})
export class Reporte {
  constructor(public route: ActivatedRoute){}
}
