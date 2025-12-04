import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Simuladorgasto } from '../../../models/simuladorgasto';
import { Usuario } from '../../../models/usuario';
import { Zona } from '../../../models/zona';
import { Simuladorgastoservice } from '../../../services/simuladorgastoservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Zonaservice } from '../../../services/zonaservice';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-simuladorgastoinsertar',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatOptionModule, MatSelectModule, RouterModule],
  templateUrl: './simuladorgastoinsertar.html',
  styleUrl: './simuladorgastoinsertar.css',
})
export class Simuladorgastoinsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  sim: Simuladorgasto = new Simuladorgasto();
  id: number = 0;
  edicion: boolean = false;

  listaUsuarios: Usuario[] = [];
  listaZonas: Zona[] = [];

  constructor(
    private sS: Simuladorgastoservice,
    private uS: Usuarioservice,
    private zS: Zonaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.uS.list().subscribe(data => this.listaUsuarios = data);
    this.zS.list().subscribe(data => this.listaZonas = data);

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      costoAlquiler: ['', Validators.required],
      costoTransporte: ['', Validators.required],
      costoTotalEstimado: ['', Validators.required],
      usuario: ['', Validators.required],
      zona: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {

      this.sim.idSimulador = this.form.value.id;
      this.sim.costoAlquiler = this.form.value.costoAlquiler;
      this.sim.costoTransporte = this.form.value.costoTransporte;
      this.sim.costoTotalEstimado = this.form.value.costoTotalEstimado;

      this.sim.usuario.idUsuario = this.form.value.usuario;
      this.sim.zona.idZona = this.form.value.zona;

      this.sim.fechaSimulacion = new Date(); // generado automáticamente

      if (this.edicion) {
        this.sS.update(this.sim).subscribe(() => {
          this.sS.list().subscribe(lista => this.sS.setList(lista));
        });
      } else {
        this.sS.insert(this.sim).subscribe(() => {
          this.sS.list().subscribe(lista => this.sS.setList(lista));
        });
      }

      this.router.navigate(['simulador']);
    }
  }

  init(): void {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe(data => {

        this.form = new FormGroup({
          id: new FormControl(data.idSimulador),
          costoAlquiler: new FormControl(data.costoAlquiler, Validators.required),
          costoTransporte: new FormControl(data.costoTransporte, Validators.required),
          costoTotalEstimado: new FormControl(data.costoTotalEstimado, Validators.required),
          usuario: new FormControl(data.usuario.idUsuario, Validators.required),
          zona: new FormControl(data.zona.idZona, Validators.required),
        });

      });
    }
  }

}
