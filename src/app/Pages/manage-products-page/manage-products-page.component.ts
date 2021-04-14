import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-products-page',
  templateUrl: './manage-products-page.component.html',
  styleUrls: ['./manage-products-page.component.css']
})
export class ManageProductsComponent implements OnInit {

  posts = [
    {
      id: 1,
      title: 'AngularJS vs Angular 2+',
      slug: 'angularjs-vs-angular2'
    },
    {
      id: 2,
      title: 'AngularJS vs Angular 2+',
      slug: 'angularjs-vs-angular2'
    },
    {
      id: 3,
      title: 'AngularJS vs Angular 2+',
      slug: 'angularjs-vs-angular2'
    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
