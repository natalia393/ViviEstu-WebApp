import { Component, OnInit } from '@angular/core';
import { Registropublico } from '../../../models/registropublicoDTO';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-usuarioinsertar',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './usuarioinsertar.html',
  styleUrl: './usuarioinsertar.css',
})
export class Usuarioinsertar implements OnInit{
    form: FormGroup = new FormGroup({});
  dto: Registropublico = new Registropublico();

  constructor(
    private uS: Usuarioservice, 
    private router: Router, 
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      correo: ['', Validators.required],
      universidad: [''],
      presupuestoMensual: ['', Validators.required],
      medioTransporte: ['', Validators.required],
      cicloEstudio: ['', Validators.required]
    });
  }

  registrar(): void {
    if (this.form.valid) {
      this.dto.username = this.form.value.username;
      this.dto.password = this.form.value.password;
      this.dto.correo = this.form.value.correo;
      this.dto.universidad = this.form.value.universidad;
      this.dto.presupuestoMensual = this.form.value.presupuestoMensual;
      this.dto.cicloEstudio = this.form.value.cicloEstudio;


      this.uS.insert(this.dto).subscribe(() => {
        this.router.navigate(['usuario']);
      });
    }
  }
}
