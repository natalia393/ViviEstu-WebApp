import { Component, OnInit } from '@angular/core';
import { Zona } from '../../../models/zona';
import { Zonaservice } from '../../../services/zonaservice';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Favoritoservice } from '../../../services/favoritoservice';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-zonalistar',
  imports: [MatCardModule, MatIconModule, RouterModule, CommonModule, MatButtonModule],
  templateUrl: './zonalistar.html',
  styleUrl: './zonalistar.css',
})
export class Zonalistar implements OnInit {
  lista: Zona[] = [];
  idUsuario!: number;

  constructor(private zS: Zonaservice,
    private favoritoService: Favoritoservice,
  ) {}

  ngOnInit(): void {
    this.zS.list().subscribe((data) => {
      this.lista = data;
    });

    this.zS.getList().subscribe((data) => {
      this.lista = data;
    });
  }

  eliminar(id: number) {
    this.zS.delete(id).subscribe(() => {
      this.zS.list().subscribe((data) => {
        this.zS.setList(data);
      });
    });
  }

  agregarFavorito(idZona: number) {
  const dto = {
    usuario: { idUsuario: 1 },
    zona: { idZona: idZona }
  };

  this.favoritoService.agregarFavorito(dto).subscribe(() => {
    alert('Agregado a favoritos ❤️');
  });
}
}
