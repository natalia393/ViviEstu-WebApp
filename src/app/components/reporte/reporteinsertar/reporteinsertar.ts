import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reporte } from '../../../models/reporte';
import { Usuario } from '../../../models/usuario';
import { Reporteservice } from '../../../services/reporteservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-reporteinsertar',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatOptionModule, RouterModule, MatSelectModule],
  templateUrl: './reporteinsertar.html',
  styleUrl: './reporteinsertar.css',
})
export class Reporteinsertar implements OnInit {

  form: FormGroup = new FormGroup({});
  reporte: Reporte = new Reporte();

  listaUsuarios: Usuario[] = [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private rS: Reporteservice,
    private uS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // Cargar usuarios
    this.uS.list().subscribe(data => this.listaUsuarios = data);

    // Detectar edición
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.init();
    });

    // Crear form
    this.form = this.formBuilder.group({
      idReporte: [''],
      titulo: ['', Validators.required],
      contenidoJson: ['', Validators.required],
      usuario: ['', Validators.required]
    });
  }

  aceptar() {
    if (this.form.valid) {

      this.reporte.idReporte = this.form.value.idReporte;
      this.reporte.titulo = this.form.value.titulo;
      this.reporte.contenidoJson = this.form.value.contenidoJson;
      this.reporte.usuario.idUsuario = this.form.value.usuario;
      this.reporte.fechaGenerado = new Date();

      if (this.edicion) {
        this.rS.update(this.reporte).subscribe(() => {
          this.rS.list().subscribe(lista => this.rS.setList(lista));
        });
      } else {
        this.rS.insert(this.reporte).subscribe(() => {
          this.rS.list().subscribe(lista => this.rS.setList(lista));
        });
      }

      this.router.navigate(['reporte']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          idReporte: new FormControl(data.idReporte),
          titulo: new FormControl(data.titulo, Validators.required),
          contenidoJson: new FormControl(data.contenidoJson, Validators.required),
          usuario: new FormControl(data.usuario.idUsuario, Validators.required)
        });
      });
    }
  }

}
