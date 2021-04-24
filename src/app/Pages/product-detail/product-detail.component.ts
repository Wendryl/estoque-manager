import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ICategory} from 'src/app/Models/category';
import {ICompany} from 'src/app/Models/company';
import {IProduct} from 'src/app/Models/product';
import {CategoryService} from 'src/app/Services/category.service';
import {CompanyService} from 'src/app/Services/company.service';
import {ProductService} from 'src/app/Services/product.service';

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
    private route: ActivatedRoute
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
      this.productService.find(Number(this.productId))
        .subscribe(
          data => {
            this.form.controls.description.setValue(data.description);
            this.form.controls.price.setValue(data.price);
            this.form.controls.quantity.setValue(data.quantity);
            this.form.controls.provider.setValue(data.provider_id);
            this.form.controls.category.setValue(data.category_id);
          }
        )
    }

    this.companyService.list()
      .subscribe(
        data => {
          this.providers = data;
        }
      )

    this.categoryService.list()
      .subscribe(
        data => {
          this.categories = data;
        }
      )

  }

  saveProduct() {
    this.product = {
      description: this.form.controls.description.value,
      category: this.form.controls.category.value,
      provider: this.form.controls.provider.value,
      price: this.form.controls.price.value,
      quantity: this.form.controls.quantity.value
    }
    console.log(this.product);
  }

}
