import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ICategory} from 'src/app/Models/category';
import {ICompany} from 'src/app/Models/company';
import {IProduct} from 'src/app/Models/product';
import {CategoryService} from 'src/app/Services/category.service';
import {CompanyService} from 'src/app/Services/company.service';
import {ProductService} from 'src/app/Services/product.service';
import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  form!: FormGroup;
  product!: IProduct;
  productId = this.route.snapshot.paramMap.get('id');
  providers!: Array<ICompany>;
  categories!: Array<ICategory>;

  constructor(
    private productService: ProductService,
    private companyService: CompanyService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      provider: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
    })

    if(this.productId) {
      this.loadProductData();
    }
    this.loadCategories();
    this.loadCompanies();

  }

  loadProductData() {
    this.productService.find(Number(this.productId))
      .subscribe(
        data => {
          this.form.controls.description.setValue(data.description);
          this.form.controls.price.setValue(data.price);
          this.form.controls.quantity.setValue(data.stock_quantity);
          this.form.controls.provider.setValue(data.provider_id);
          this.form.controls.category.setValue(data.category_id);
        }
      )
  }

  loadCategories() {
    this.categoryService.list()
      .subscribe(
        data => {
          this.categories = data;
        }
      )
  }

  loadCompanies() {
    this.companyService.list()
      .subscribe(
        data => {
          this.providers = data;
        }
      )
  }

  saveProduct() {
    this.product = {
      description: this.form.controls.description.value,
      category_id: this.form.controls.category.value,
      provider_id: this.form.controls.provider.value,
      price: this.form.controls.price.value,
      stock_quantity: this.form.controls.quantity.value
    }

    if(
      !this.product.description ||
      !this.product.category_id ||
      !this.product.provider_id ||
      !this.product.price ||
      !this.product.stock_quantity
    ) {
      return Swal.default.fire(
        'Aviso!',
        'Por favor, preencha todos os campos do formulário para continuar!',
        'warning'
      );
    }

    if(this.productId) {
      this.productService.update(Number(this.productId), this.product)
        .subscribe(
          result => {
            if(result === 1) {
              Swal.default.fire('Tudo certo!',
                'O produto foi atualizado com sucesso',
                'success'
              ).then(
                _ok => {
                  return this.router.navigate(['/dashboard/manage-products']);
                }
              )
              return;
            }
            return Swal.default.fire('Erro!',
              'Um erro inesperado aconteceu ao atualizar o produto',
              'error'
            );
          }
        )
    } else {
      this.productService.create(this.product)
        .subscribe(
          result => {
            if(result) {
              Swal.default.fire('Tudo certo!',
                'O produto foi cadastrado com sucesso',
                'success'
              ).then(
                _ok => {
                  return this.router.navigate(['/dashboard/manage-products']);
                }
              )
              return;
            }
            return Swal.default.fire('Erro!',
              'Um erro inesperado aconteceu ao cadastrar o produto',
              'error'
            );
          }
        )
    }
    return;
  }

}
