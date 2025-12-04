import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comparaciondetalle } from '../../../models/comparaciondetalle';
import { Comparacion } from '../../../models/comparacion';
import { Zona } from '../../../models/zona';
import { Comparaciondetalleservice } from '../../../services/comparaciondetalleservice';
import { Comparacionservice } from '../../../services/comparacionservice';
import { Zonaservice } from '../../../services/zonaservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-comparaciondetalleinsertar',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatOptionModule],
  templateUrl: './comparaciondetalleinsertar.html',
  styleUrl: './comparaciondetalleinsertar.css',
})
export class Comparaciondetalleinsertar implements OnInit {

  form: FormGroup = new FormGroup({});
  detalle: Comparaciondetalle = new Comparaciondetalle();

  listaComparaciones: Comparacion[] = [];
  listaZonas: Zona[] = [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private cdS: Comparaciondetalleservice,
    private cS: Comparacionservice,
    private zS: Zonaservice,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.cS.list().subscribe(data => this.listaComparaciones = data);
    this.zS.list().subscribe(data => this.listaZonas = data);

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idCompDetalle: [''],
      comparacion: ['', Validators.required],
      zona: ['', Validators.required]
    });
  }

  aceptar() {
    if (this.form.valid) {

      this.detalle.idCompDetalle = this.form.value.idCompDetalle;
      this.detalle.comparacion.idComparacion = this.form.value.comparacion;
      this.detalle.zona.idZona = this.form.value.zona;

      if (this.edicion) {
        this.cdS.update(this.detalle).subscribe(() => {
          this.cdS.list().subscribe(lista => this.cdS.setList(lista));
        });
      } else {
        this.cdS.insert(this.detalle).subscribe(() => {
          this.cdS.list().subscribe(lista => this.cdS.setList(lista));
        });
      }

      this.router.navigate(['comparaciondetalle']);
    }
  }

  init() {
    if (this.edicion) {
      this.cdS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          idCompDetalle: new FormControl(data.idCompDetalle),
          comparacion: new FormControl(data.comparacion.idComparacion, Validators.required),
          zona: new FormControl(data.zona.idZona, Validators.required),
        });
      });
    }
  }

}
