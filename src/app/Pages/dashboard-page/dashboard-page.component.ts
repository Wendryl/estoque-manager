import { Component, OnInit } from '@angular/core';
import {CategoryService} from 'src/app/Services/category.service';
import {CompanyService} from 'src/app/Services/company.service';
import {ProductService} from 'src/app/Services/product.service';
import {SaleService} from 'src/app/Services/sale.service';
import {UserService} from 'src/app/Services/user.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  companyCounter: string | number = 'Carregando...';
  productCounter: string | number =  'Carregando...';
  categoryCounter: string | number =  'Carregando...';
  userCounter: string | number =  'Carregando...';
  saleCounter: string | number = 'Carregando...';

  constructor(
    private companyService: CompanyService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService,
    private saleService: SaleService,
  ) { }

  ngOnInit(): void {

    this.companyService.list()
      .subscribe(
        data => this.companyCounter = data.length
      )

    this.productService.list()
      .subscribe(
        data => this.productCounter = data.length
      )

    this.categoryService.list()
      .subscribe(
        data => this.categoryCounter = data.length
      )

    this.userService.list()
      .subscribe(
        data => this.userCounter = data.length
      )

    this.saleService.list()
      .subscribe(
        data => this.saleCounter = data.length
      )

  }

  registerSale() {
  }

}
