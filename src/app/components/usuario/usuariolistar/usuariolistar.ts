import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { Usuarioservice } from '../../../services/usuarioservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuariolistar',
  imports: [MatTableModule,
  MatButtonModule,
  MatIconModule,
  RouterModule, CommonModule],
  templateUrl: './usuariolistar.html',
  styleUrl: './usuariolistar.css',
})
export class Usuariolistar implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private vS: Usuarioservice){}

  ngOnInit(): void {
    this.vS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })

    //insertar
    this.vS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
  eliminar(id: number) {
    this.vS.delete(id).subscribe((data) => {
      this.vS.list().subscribe((data) => {
        this.vS.setList(data);
      });
    });
  }
}
