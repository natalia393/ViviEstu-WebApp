import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';
import { Simuladorgastolistar } from './simuladorgastolistar/simuladorgastolistar';

@Component({
  selector: 'app-simuladorgasto',
  imports: [RouterModule, Menu, Simuladorgastolistar],
  templateUrl: './simuladorgasto.html',
  styleUrl: './simuladorgasto.css',
})
export class Simuladorgasto {
  constructor(public route: ActivatedRoute){}
}
