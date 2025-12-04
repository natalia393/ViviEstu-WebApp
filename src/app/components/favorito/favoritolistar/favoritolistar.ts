import { Component, OnInit } from '@angular/core';
import { Zona } from '../../../models/zona';
import { Favoritoservice } from '../../../services/favoritoservice';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritolistar',
  imports: [MatCardModule, CommonModule],
  templateUrl: './favoritolistar.html',
  styleUrl: './favoritolistar.css',
})
export class Favoritolistar implements OnInit{
  favoritos: Zona[] = [];

  constructor(private favoritoService: Favoritoservice) {}

  ngOnInit(): void {
    this.favoritoService.listarFavoritos()
      .subscribe(data => {
        this.favoritos = data;
      });
  }

}
