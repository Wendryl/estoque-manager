import { Component, OnInit } from '@angular/core';
import {ICompany} from 'src/app/Models/company';
import {CompanyService} from 'src/app/Services/company.service';
import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.css']
})
export class CompaniesPageComponent implements OnInit {

  loading = false;
  companies: Array<ICompany> = [];
  toast = Swal.default.mixin({
    toast: true,
    position: 'top-right'
  });

  constructor(private _companyService: CompanyService) { }

  ngOnInit(): void {
    this.loading = true;
    this._companyService.list()
      .subscribe(
        data => {
          this.loading = false;
          this.companies = data;
        }
      )
  }

  async deleteCompany(name: string, id?: number) {
    const confirm = await Swal.default.fire({
      title: 'Aviso!',
      html: `Tem certeza que deseja excluir o produto<br> "${name}" ?<br> Esta ação não pode ser revertida!`,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      cancelButtonColor: '#dc3545',
      confirmButtonColor: '#157347',
      customClass: {
        cancelButton: 'order-1',
        confirmButton: 'order-2'
      }
    });

    if(confirm.isConfirmed) {
      this._companyService.delete(Number(id))
        .subscribe(
          data => {
            if(data == 1) {
              this.toast.fire('Sucesso', 'Fornecedor excluído com sucesso', 'success');
              this._companyService.list()
                .subscribe(
                  data => this.companies = data
                )
            } else {
              this.toast.fire('Erro', 'Houve uma falha ao excluir o produto', 'error');
            }
          }
        )
    }

  }

}
