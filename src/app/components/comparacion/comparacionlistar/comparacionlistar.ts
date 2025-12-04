import { Component, OnInit } from '@angular/core';
import { Comparacion } from '../../../models/comparacion';
import { Comparacionservice } from '../../../services/comparacionservice';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-comparacionlistar',
  imports: [MatCardModule, MatIconModule, RouterModule, DatePipe, CommonModule, MatButtonModule],
  templateUrl: './comparacionlistar.html',
  styleUrl: './comparacionlistar.css',
})
export class Comparacionlistar implements OnInit {
  lista: Comparacion[] = [];

  constructor(private cS: Comparacionservice) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.lista = data;
    });

    this.cS.getList().subscribe((data) => {
      this.lista = data;
    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe(() => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }

}
