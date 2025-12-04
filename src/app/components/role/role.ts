import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';
import { Rolelistar } from './rolelistar/rolelistar';

@Component({
  selector: 'app-role',
  imports: [RouterModule, Menu, Rolelistar],
  templateUrl: './role.html',
  styleUrl: './role.css',
})
export class Role {
  constructor(public route: ActivatedRoute){}
}
