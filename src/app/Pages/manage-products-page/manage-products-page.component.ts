import { Component, OnInit } from '@angular/core';
import {IProduct} from 'src/app/Models/product';
import {ProductService} from 'src/app/Services/product.service';

@Component({
  selector: 'app-manage-products-page',
  templateUrl: './manage-products-page.component.html',
  styleUrls: ['./manage-products-page.component.css']
})
export class ManageProductsComponent implements OnInit {

  products: Array<IProduct> = [];

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {

    this._productService.list()
      .subscribe(
        data => this.products = data
      )
  }

}
