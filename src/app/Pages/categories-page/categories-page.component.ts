import { Component, OnInit } from '@angular/core';
import {ICategory} from 'src/app/Models/category';
import {CategoryService} from 'src/app/Services/category.service';
import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  loading = false;
  categories: Array<ICategory> = [];
  toast = Swal.default.mixin({
    toast: true,
    position: 'top-right'
  });

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {

    this.loading = true;
    this._categoryService.list()
      .subscribe(
        data => {
          this.categories = data;
          this.loading = false;
        }
      )
  }

  async deleteCategory(description: string, id?: number) {
    const confirm = await Swal.default.fire({
      title: 'Aviso!',
      html: `Tem certeza que deseja excluir a categoria<br> "${description}" ?<br> Esta ação não pode ser revertida!`,
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
      this._categoryService.delete(Number(id))
        .subscribe(
          data => {
            if(data == 1) {
              this.toast.fire('Sucesso', 'Categoria excluída com sucesso', 'success');
              this._categoryService.list()
                .subscribe(
                  data => this.categories = data
                )
            } else {
              this.toast.fire('Erro', 'Houve uma falha ao excluir a categoria', 'error');
            }
          }
        )
    }

  }

}
