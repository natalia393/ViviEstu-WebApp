import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Zona } from '../../../models/zona';
import { Zonaservice } from '../../../services/zonaservice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-zonainsertar',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, RouterModule],
  templateUrl: './zonainsertar.html',
  styleUrl: './zonainsertar.css',
})
export class Zonainsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  zona: Zona = new Zona();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private zS: Zonaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Detectar edición
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.init();
    });

    // Crear formulario
    this.form = this.formBuilder.group({
      idZona: [''],
      nombreZona: ['', Validators.required],
      distrito: ['', Validators.required],
      precioPromedio: ['', Validators.required],
      nivelSeguridad: ['', Validators.required],
      accesibilidadTransporte: ['', Validators.required],
      serviciosCercanos: ['', Validators.required],
      descripcion: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      imagenUrl: [''],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.zona.idZona = this.form.value.idZona;
      this.zona.nombreZona = this.form.value.nombreZona;
      this.zona.distrito = this.form.value.distrito;
      this.zona.precioPromedio = this.form.value.precioPromedio;
      this.zona.nivelSeguridad = this.form.value.nivelSeguridad;
      this.zona.accesibilidadTransporte = this.form.value.accesibilidadTransporte;
      this.zona.serviciosCercanos = this.form.value.serviciosCercanos;
      this.zona.descripcion = this.form.value.descripcion;
      this.zona.latitud = this.form.value.latitud;
      this.zona.longitud = this.form.value.longitud;
      this.zona.imagenUrl = this.form.value.imagenUrl;

      if (this.edicion) {
        this.zS.update(this.zona).subscribe(() => {
          this.zS.list().subscribe((data) => this.zS.setList(data));
        });
      } else {
        this.zS.insert(this.zona).subscribe(() => {
          this.zS.list().subscribe((data) => this.zS.setList(data));
        });
      }

      this.router.navigate(['zona']);
    }
  }

  init(): void {
    if (this.edicion) {
      this.zS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idZona: new FormControl(data.idZona),
          nombreZona: new FormControl(data.nombreZona, Validators.required),
          distrito: new FormControl(data.distrito, Validators.required),
          precioPromedio: new FormControl(data.precioPromedio, Validators.required),
          nivelSeguridad: new FormControl(data.nivelSeguridad, Validators.required),
          accesibilidadTransporte: new FormControl(
            data.accesibilidadTransporte,
            Validators.required
          ),
          serviciosCercanos: new FormControl(data.serviciosCercanos, Validators.required),
          descripcion: new FormControl(data.descripcion, Validators.required),
          latitud: new FormControl(data.latitud, Validators.required),
          longitud: new FormControl(data.longitud, Validators.required),
          imagenUrl: new FormControl(data.imagenUrl),
        });
      });
    }
  }
}
