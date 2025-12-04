import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-favorito',
  imports: [RouterModule, Menu, MatCardModule],
  templateUrl: './favorito.html',
  styleUrl: './favorito.css',
})
export class Favorito {
  constructor(public route: ActivatedRoute){}

}
