import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Simuladorgasto } from '../../../models/simuladorgasto';
import { Simuladorgastoservice } from '../../../services/simuladorgastoservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-simuladorgastolistar',
  imports: [MatTableModule,
  MatButtonModule,
  MatIconModule,
  DatePipe,
  RouterModule, CommonModule],
  templateUrl: './simuladorgastolistar.html',
  styleUrl: './simuladorgastolistar.css',
})
export class Simuladorgastolistar implements OnInit {
  dataSource: MatTableDataSource<Simuladorgasto> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private eS: Simuladorgastoservice){}

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
