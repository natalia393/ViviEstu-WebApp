import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../../models/role';
import { Roleservice } from '../../../services/roleservice';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-roleinsertar',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, RouterModule],
  templateUrl: './roleinsertar.html',
  styleUrl: './roleinsertar.css',
})
export class Roleinsertar implements OnInit {

  form: FormGroup = new FormGroup({});
  role: Role = new Role();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private rS: Roleservice,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      rol: ['', Validators.required]
    });
  }

  aceptar() {
    if (this.form.valid) {

      this.role.id = this.form.value.id;
      this.role.rol = this.form.value.rol;

      if (this.edicion) {
        this.rS.update(this.role).subscribe(() => {
          this.rS.list().subscribe(lista => this.rS.setList(lista));
        });
      } else {
        this.rS.insert(this.role).subscribe(() => {
          this.rS.list().subscribe(lista => this.rS.setList(lista));
        });
      }

      this.router.navigate(['roles']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe(data => {

        this.form = new FormGroup({
          id: new FormControl(data.id),
          rol: new FormControl(data.rol, Validators.required)
        });

      });
    }
  }

}
