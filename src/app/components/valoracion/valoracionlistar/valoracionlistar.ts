import { Component, OnInit } from '@angular/core';
import { Valoracion } from '../../../models/valoracion';
import { Valoracionservice } from '../../../services/valoracionservice';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-valoracionlistar',
  imports: [MatIconModule, MatCardModule, RouterModule, DatePipe, CommonModule, MatButtonModule],
  templateUrl: './valoracionlistar.html',
  styleUrl: './valoracionlistar.css',
})
export class Valoracionlistar implements OnInit {
  lista: Valoracion[] = [];
  
    constructor(private vS: Valoracionservice) {}
  
    ngOnInit(): void {
      this.vS.list().subscribe((data) => {
        this.lista = data;
      });
  
      this.vS.getList().subscribe((data) => {
        this.lista = data;
      });
    }
  
    eliminar(id: number) {
      this.vS.delete(id).subscribe(() => {
        this.vS.list().subscribe((data) => {
          this.vS.setList(data);
        });
      });
    }
}
