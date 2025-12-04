import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Comparaciondetalle } from '../../../models/comparaciondetalle';
import { Comparaciondetalleservice } from '../../../services/comparaciondetalleservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-comparaciondetallelistar',
  imports: [MatTableModule,
  MatButtonModule,
  MatIconModule,
  RouterModule, CommonModule],
  templateUrl: './comparaciondetallelistar.html',
  styleUrl: './comparaciondetallelistar.css',
})
export class Comparaciondetallelistar implements OnInit {
  dataSource: MatTableDataSource<Comparaciondetalle> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private eS: Comparaciondetalleservice){}

  ngOnInit(): void {
    this.eS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })

    //insertar
    this.eS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
  eliminar(id: number) {
    this.eS.delete(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
}
