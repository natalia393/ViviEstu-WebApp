import { Component, OnInit } from '@angular/core';
import { Zonauniversidad } from '../../../models/zonauniversidad';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Zonauniversidadservice } from '../../../services/zonauniversidadservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-zonauniversidadlistar',
  imports: [MatTableModule,
  MatButtonModule,
  MatIconModule,
  RouterModule, CommonModule],
  templateUrl: './zonauniversidadlistar.html',
  styleUrl: './zonauniversidadlistar.css',
})
export class Zonauniversidadlistar implements OnInit {
  dataSource: MatTableDataSource<Zonauniversidad> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private eS: Zonauniversidadservice){}

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
