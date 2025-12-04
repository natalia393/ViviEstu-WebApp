import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';
import { Comparacionlistar } from './comparacionlistar/comparacionlistar';

@Component({
  selector: 'app-comparacion',
  imports: [RouterModule, Menu, Comparacionlistar],
  templateUrl: './comparacion.html',
  styleUrl: './comparacion.css',
})
export class Comparacion {
  constructor(public route: ActivatedRoute){}
}
