import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ICategory} from 'src/app/Models/category';
import {ICompany} from 'src/app/Models/company';
import {CategoryService} from 'src/app/Services/category.service';
import {CompanyService} from 'src/app/Services/company.service';
import {ProductService} from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  form!: FormGroup
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
            this.form.controls.provider.setValue(data.provider);
            this.form.controls.category.setValue(data.category);
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

}
