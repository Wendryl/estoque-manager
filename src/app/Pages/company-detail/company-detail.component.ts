import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ICity} from 'src/app/Models/city';
import {ICompany} from 'src/app/Models/company';
import {IUf} from 'src/app/Models/uf';
import {CepService} from 'src/app/Services/cep.service';
import {CompanyService} from 'src/app/Services/company.service';
import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  form!: FormGroup;
  company!: ICompany;
  companyId = this.route.snapshot.paramMap.get('id');
  ufs!: Array<IUf>;
  cities!: Array<ICity>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cepService: CepService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null),
      neighborhood: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      uf: new FormControl(null, [Validators.required])
    })

    if(this.companyId) {
      this.loadCompanyData();
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

  loadCompanyData() {
    this.companyService.find(Number(this.companyId))
      .subscribe(
        data => {
          this.form.controls.name.setValue(data.name);
          this.form.controls.phone.setValue(data.phone);
          this.form.controls.email.setValue(data.email);
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

  saveCompany() {
    this.company = {
      name: this.form.controls.name.value,
      email: this.form.controls.email.value,
      phone: this.form.controls.phone.value,
      neighborhood: this.form.controls.neighborhood.value,
      uf: this.form.controls.uf.value,
      city: this.form.controls.city.value
    }

    if(
      !this.company.name ||
      !this.company.phone ||
      !this.company.neighborhood ||
      !this.company.city ||
      !this.company.uf
    ) {
      return Swal.default.fire(
        'Aviso!',
        'Por favor, preencha todos os campos do formulário para continuar!',
        'warning'
      );
    }

    if(this.companyId) {
      this.companyService.update(Number(this.companyId), this.company)
        .subscribe(
          result => {
            if(result === 1) {
              Swal.default.fire('Tudo certo!',
                'O fornecedor foi atualizado com sucesso',
                'success'
              ).then(
                _ok => {
                  return this.router.navigate(['/dashboard/companies']);
                }
              )
              return;
            }
            return Swal.default.fire('Erro!',
              'Um erro inesperado aconteceu ao atualizar o fornecedor',
              'error'
            );
          }
        )
    } else {
      this.companyService.create(this.company)
        .subscribe(
          result => {
            if(result) {
              Swal.default.fire('Tudo certo!',
                'O fornecedor foi cadastrado com sucesso',
                'success'
              ).then(
                _ok => {
                  return this.router.navigate(['/dashboard/companies']);
                }
              )
              return;
            }
            return Swal.default.fire('Erro!',
              'Um erro inesperado aconteceu ao cadastrar o fornecedor',
              'error'
            );
          }
        )
    }
    return;
  }
}
