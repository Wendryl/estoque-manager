import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ICategory} from 'src/app/Models/category';
import {CategoryService} from 'src/app/Services/category.service';
import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  form!: FormGroup;
  category!: ICategory;
  categoryId = this.route.snapshot.paramMap.get('id');
  title = 'Nova Categoria';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      description: new FormControl(null, [Validators.required]),
    })

    if(this.categoryId) {
      this.title = 'Editar Categoria';
      this.loadCategory();
    }

  }

  loadCategory() {
    this._categoryService.find(Number(this.categoryId))
      .subscribe(
        data => {
          this.form.controls.description.setValue(data.description);
        }
      )
  }

  saveCategory() {
    this.category = {
      description: this.form.controls.description.value,
    }

    if(
      !this.category.description
    ) {
      return Swal.default.fire(
        'Aviso!',
        'Por favor, preencha todos os campos do formulário para continuar!',
        'warning'
      );
    }

    if(this.categoryId) {
      this._categoryService.update(Number(this.categoryId), this.category)
        .subscribe(
          result => {
            if(result === 1) {
              Swal.default.fire('Tudo certo!',
                'A categoria foi atualizada com sucesso',
                'success'
              ).then(
                _ok => {
                  return this.router.navigate(['/dashboard/categories']);
                }
              )
              return;
            }
            return Swal.default.fire('Erro!',
              'Um erro inesperado aconteceu ao atualizar a categoria',
              'error'
            );
          }
        )
    } else {
      this._categoryService.create(this.category)
        .subscribe(
          result => {
            if(result) {
              Swal.default.fire('Tudo certo!',
                'A categoria foi cadastrada com sucesso',
                'success'
              ).then(
                _ok => {
                  return this.router.navigate(['/dashboard/categories']);
                }
              )
              return;
            }
            return Swal.default.fire('Erro!',
              'Um erro inesperado aconteceu ao cadastrar a categoria',
              'error'
            );
          }
        )
    }
    return;
  }

}
