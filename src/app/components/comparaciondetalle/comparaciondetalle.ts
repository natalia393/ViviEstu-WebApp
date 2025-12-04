import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';
import { Comparaciondetallelistar } from './comparaciondetallelistar/comparaciondetallelistar';

@Component({
  selector: 'app-comparaciondetalle',
  imports: [RouterModule, Menu, Comparaciondetallelistar],
  templateUrl: './comparaciondetalle.html',
  styleUrl: './comparaciondetalle.css',
})
export class Comparaciondetalle {
  constructor(public route: ActivatedRoute){}
}
