import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Zona } from '../../../models/zona';
import { Zonaservice } from '../../../services/zonaservice';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Comparacion } from '../../../models/comparacion';
import { Usuario } from '../../../models/usuario';
import { Comparacionservice } from '../../../services/comparacionservice';
import { Comparaciondetalleservice } from '../../../services/comparaciondetalleservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Comparaciondetalle } from '../../../models/comparaciondetalle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-comparacioninsertar',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatOptionModule, MatSelectModule, RouterModule],
  templateUrl: './comparacioninsertar.html',
  styleUrl: './comparacioninsertar.css',
})
export class Comparacioninsertar implements OnInit {
  
  form: FormGroup = new FormGroup({});
  comparacion: Comparacion = new Comparacion();

  listaUsuarios: Usuario[] = [];
  listaZonas: Zona[] = [];

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private cS: Comparacionservice,
    private cdS: Comparaciondetalleservice,
    private uS: Usuarioservice,
    private zS: Zonaservice,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.uS.list().subscribe(data => this.listaUsuarios = data);
    this.zS.list().subscribe(data => this.listaZonas = data);

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      usuario: ['', Validators.required],
      zonas: [[], Validators.required]
    });
  }

  aceptar() {
    if (this.form.valid) {

      this.comparacion.idComparacion = this.form.value.id;
      this.comparacion.usuario.idUsuario = this.form.value.usuario;
      this.comparacion.fecha = new Date();

      if (this.edicion) {

        this.cS.update(this.comparacion).subscribe(() => {
          this.cS.list().subscribe(lista => this.cS.setList(lista));
          this.router.navigate(['comparacion']);
        });

      } else {

        this.cS.insert(this.comparacion).subscribe((nuevo) => {

          const idComp = nuevo.idComparacion;
          const zonas: number[] = this.form.value.zonas;

          zonas.forEach(idZona => {
            const det = new Comparaciondetalle();
            det.comparacion.idComparacion = idComp;
            det.zona.idZona = idZona;

            this.cdS.insert(det).subscribe();
          });

          this.cS.list().subscribe(lista => this.cS.setList(lista));
          this.router.navigate([`/comparacion/detalle/${idComp}`]);
        });

      }
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe(data => {

        this.form = new FormGroup({
          id: new FormControl(data.idComparacion),
          usuario: new FormControl(data.usuario.idUsuario),
          zonas: new FormControl([]),   // si quisieras editar zonas deberías cargarlas
        });

      });
    }
  }
}
