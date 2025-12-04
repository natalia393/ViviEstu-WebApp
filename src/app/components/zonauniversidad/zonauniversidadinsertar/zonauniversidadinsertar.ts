import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Zonauniversidad } from '../../../models/zonauniversidad';
import { Zona } from '../../../models/zona';
import { Zonauniversidadservice } from '../../../services/zonauniversidadservice';
import { Zonaservice } from '../../../services/zonaservice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-zonauniversidadinsertar',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatOptionModule, MatSelectModule, RouterModule],
  templateUrl: './zonauniversidadinsertar.html',
  styleUrl: './zonauniversidadinsertar.css',
})
export class Zonauniversidadinsertar implements OnInit {

  form: FormGroup = new FormGroup({});
  zu: Zonauniversidad = new Zonauniversidad();
  id: number = 0;
  edicion: boolean = false;

  listaZonas: Zona[] = [];

  constructor(
    private zuS: Zonauniversidadservice,
    private zS: Zonaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.zS.list().subscribe(data => this.listaZonas = data);

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      universidad: ['', Validators.required],
      distanciaMinutos: ['', Validators.required],
      zona: ['', Validators.required]
    });
  }

  aceptar() {
    if (this.form.valid) {

      this.zu.idZonaUniversidad = this.form.value.id;
      this.zu.universidad = this.form.value.universidad;
      this.zu.distanciaMinutos = this.form.value.distanciaMinutos;
      this.zu.zona.idZona = this.form.value.zona;

      if (this.edicion) {
        this.zuS.update(this.zu).subscribe(() => {
          this.zuS.list().subscribe(data => this.zuS.setList(data));
        });
      } else {
        this.zuS.insert(this.zu).subscribe(() => {
          this.zuS.list().subscribe(data => this.zuS.setList(data));
        });
      }

      this.router.navigate(['zona-universidad']);
    }
  }

  init() {
    if (this.edicion) {
      this.zuS.listId(this.id).subscribe(data => {

        this.form = new FormGroup({
          id: new FormControl(data.idZonaUniversidad),
          universidad: new FormControl(data.universidad, Validators.required),
          distanciaMinutos: new FormControl(data.distanciaMinutos, Validators.required),
          zona: new FormControl(data.zona.idZona, Validators.required)
        });

      });
    }
  }

}
