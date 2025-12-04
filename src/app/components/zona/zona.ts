import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';
import { Zonalistar } from './zonalistar/zonalistar';

@Component({
  selector: 'app-zona',
  imports: [RouterModule, Menu, Zonalistar],
  templateUrl: './zona.html',
  styleUrl: './zona.css',
})
export class Zona {
  constructor(public route: ActivatedRoute){}
}
