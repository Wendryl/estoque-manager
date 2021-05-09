import { Component, OnInit } from '@angular/core';
import {ICompany} from 'src/app/Models/company';
import {CompanyService} from 'src/app/Services/company.service';

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.css']
})
export class CompaniesPageComponent implements OnInit {

  companies: Array<ICompany> = [];
  constructor(private _companyService: CompanyService) { }

  ngOnInit(): void {
    this._companyService.list()
      .subscribe(
        data => this.companies = data
      )
  }

}
