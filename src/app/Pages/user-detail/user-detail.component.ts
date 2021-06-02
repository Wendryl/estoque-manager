import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ICity} from 'src/app/Models/city';
import {IUf} from 'src/app/Models/uf';
import {IUser} from 'src/app/Models/user';
import {CepService} from 'src/app/Services/cep.service';
import {UserService} from 'src/app/Services/user.service';
import * as Swal from 'sweetalert2';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  form!: FormGroup;
  user!: IUser;
  userId = this.route.snapshot.paramMap.get('id');
  ufs!: Array<IUf>;
  cities!: Array<ICity>;
  title = 'Novo Usuário';
  profiles = ['Administrador', 'Funcionário'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cepService: CepService,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    if(!this.userId) {
      this.form = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        phone: new FormControl(null),
        email: new FormControl(null, [Validators.required]),
        profile: new FormControl(null, [Validators.required]),
        neighborhood: new FormControl(null),
        city: new FormControl(null),
        uf: new FormControl(null),
        password: new FormControl(null, [Validators.required])
      })
    }

    if(this.userId) {
      this.title = 'Editar Usuário';

      this.form = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        phone: new FormControl(null),
        email: new FormControl(null, [Validators.required]),
        profile: new FormControl(null, [Validators.required]),
        neighborhood: new FormControl(null),
        city: new FormControl(null),
        uf: new FormControl(null)
      })

      this.loadUserData();
    }

    this.loadUfs()
  }

  loadUfs() {
    this.cepService.listUfs()
      .subscribe(
        data => this.ufs = data
      )
  }

  loadCities(uf: string) {
    this.cepService.listCities(uf)
      .subscribe(
        data => this.cities = data
      )
  }

  loadUserData() {
    this.userService.find(Number(this.userId))
      .subscribe(
        data => {
          this.form.controls.name.setValue(data.name);
          this.form.controls.phone.setValue(data.phone);
          this.form.controls.email.setValue(data.email);
          this.form.controls.profile.setValue(data.profile_id);
          this.form.controls.uf.setValue(data.uf);
          this.cepService.listCities(data.uf)
            .subscribe(
              cities => {
                this.cities = cities;
                this.form.controls.city.setValue(data.city);
              }
            )
          this.form.controls.neighborhood.setValue(data.neighborhood);
        }
      )
  }

  saveUser() {
    if(this.userId) {
      this.user = {
        name: this.form.controls.name.value,
        email: this.form.controls.email.value,
        phone: this.form.controls.phone.value,
        profile_id: this.form.controls.profile.value,
        neighborhood: this.form.controls.neighborhood.value,
        uf: this.form.controls.uf.value,
        city: this.form.controls.city.value
      }
    } else {
      this.user = {
        name: this.form.controls.name.value,
        email: this.form.controls.email.value,
        phone: this.form.controls.phone.value,
        profile_id: this.form.controls.profile.value,
        neighborhood: this.form.controls.neighborhood.value,
        uf: this.form.controls.uf.value,
        city: this.form.controls.city.value,
        password: crypto.SHA256(this.form.controls.password.value).toString(crypto.enc.Base64)
      }
    }

    if(
      !this.user.name ||
      !this.user.email ||
      this.user.profile_id == null
    ) {
      return Swal.default.fire(
        'Aviso!',
        'Por favor, preencha todos os campos do formulário para continuar!',
        'warning'
      );
    }

    if(this.userId) {
      this.userService.update(Number(this.userId), this.user)
        .subscribe(
          result => {
            if(result === 1) {
              Swal.default.fire('Tudo certo!',
                'O usuário foi atualizado com sucesso',
                'success'
              ).then(
                _ok => {
                  return this.router.navigate(['/dashboard/users']);
                }
              )
              return;
            }
            return Swal.default.fire('Erro!',
              'Um erro inesperado aconteceu ao atualizar o usuário',
              'error'
            );
          }
        )
    } else {
      this.userService.create(this.user)
        .subscribe(
          result => {
            if(result) {
              Swal.default.fire('Tudo certo!',
                'O usuário foi cadastrado com sucesso',
                'success'
              ).then(
                _ok => {
                  return this.router.navigate(['/dashboard/users']);
                }
              )
              return;
            }
            return Swal.default.fire('Erro!',
              'Um erro inesperado aconteceu ao cadastrar o usuário',
              'error'
            );
          }
        )
    }
    return;
  }

}
