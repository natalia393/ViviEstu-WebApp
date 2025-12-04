import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Role } from '../../../models/role';
import { Roleservice } from '../../../services/roleservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rolelistar',
  imports: [MatTableModule,
  MatButtonModule,
  MatIconModule,
  RouterModule, CommonModule],
  templateUrl: './rolelistar.html',
  styleUrl: './rolelistar.css',
})
export class Rolelistar implements OnInit {
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private eS: Roleservice){}

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
