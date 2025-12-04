import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Reporte } from '../../../models/reporte';
import { Reporteservice } from '../../../services/reporteservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reportedetalles',
  imports: [MatTableModule,
  MatButtonModule,
  MatIconModule,
  DatePipe,
  RouterModule, CommonModule],
  templateUrl: './reportedetalles.html',
  styleUrl: './reportedetalles.css',
})
export class Reportedetalles implements OnInit{
  dataSource: MatTableDataSource<Reporte> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private eS: Reporteservice){}
  
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
