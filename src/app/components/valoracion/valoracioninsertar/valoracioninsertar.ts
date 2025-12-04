import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Valoracion } from '../../../models/valoracion';
import { Valoracionservice } from '../../../services/valoracionservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Usuario } from '../../../models/usuario';
import { Zona } from '../../../models/zona';
import { Zonaservice } from '../../../services/zonaservice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-valoracioninsertar',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatOptionModule, RouterModule, MatSelectModule],
  templateUrl: './valoracioninsertar.html',
  styleUrl: './valoracioninsertar.css',
})
export class Valoracioninsertar implements OnInit {

  form: FormGroup = new FormGroup({});
  val: Valoracion = new Valoracion();
  id: number = 0;
  edicion: boolean = false;

  listaUsuarios: Usuario[] = [];
  listaZonas: Zona[] = [];

  constructor(
    private vS: Valoracionservice,
    private uS: Usuarioservice,
    private zS: Zonaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.uS.list().subscribe(data => this.listaUsuarios = data);
    this.zS.list().subscribe(data => this.listaZonas = data);

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      puntajeSeguridad: ['', Validators.required],
      puntajeAcceso: ['', Validators.required],
      puntajeServicios: ['', Validators.required],
      comentario: ['', Validators.required],
      usuario: ['', Validators.required],
      zona: ['', Validators.required]
    });
  }

  aceptar() {
    if (this.form.valid) {

      this.val.idValoracion = this.form.value.id;
      this.val.puntajeSeguridad = this.form.value.puntajeSeguridad;
      this.val.puntajeAcceso = this.form.value.puntajeAcceso;
      this.val.puntajeServicios = this.form.value.puntajeServicios;
      this.val.comentario = this.form.value.comentario;
      this.val.usuario.idUsuario = this.form.value.usuario;
      this.val.zona.idZona = this.form.value.zona;

      if (this.edicion) {
        this.vS.update(this.val).subscribe(() => {
          this.vS.list().subscribe(data => this.vS.setList(data));
        });
      } else {
        this.vS.insert(this.val).subscribe(() => {
          this.vS.list().subscribe(data => this.vS.setList(data));
        });
      }

      this.router.navigate(['valoracion']);
    }
  }

  init() {
    if (this.edicion) {
      this.vS.listId(this.id).subscribe(data => {

        this.form = new FormGroup({
          id: new FormControl(data.idValoracion),
          puntajeSeguridad: new FormControl(data.puntajeSeguridad, Validators.required),
          puntajeAcceso: new FormControl(data.puntajeAcceso, Validators.required),
          puntajeServicios: new FormControl(data.puntajeServicios, Validators.required),
          comentario: new FormControl(data.comentario, Validators.required),
          usuario: new FormControl(data.usuario.idUsuario, Validators.required),
          zona: new FormControl(data.zona.idZona, Validators.required),
        });

      });
    }
  }

}
